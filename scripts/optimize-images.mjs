import { copyFile, mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(projectRoot, "public");
const backupRoot = path.join(projectRoot, "source-assets", "web-originals");
const optimizedRoot = path.join(publicRoot, "optimized");
const collections = [
  { name: "art", sourceDirectory: path.join(publicRoot, "art"), keepBackup: true },
  { name: "images", sourceDirectory: path.join(publicRoot, "images"), keepBackup: true },
  {
    name: "artworks",
    sourceDirectory: path.join(projectRoot, "source-assets", "artworks_2001_summer youth program"),
    keepBackup: false,
  },
];

const fileExists = async (filePath) => {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
};

const jpegFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && /\.jpe?g$/i.test(entry.name))
    .map((entry) => path.join(directory, entry.name))
    .sort();
};

const outputName = (filePath, collection) => {
  const originalName = path.basename(filePath);
  if (collection !== "artworks") return originalName;
  const stem = path.basename(originalName, path.extname(originalName));
  return `${stem
    .toLowerCase()
    .replaceAll("'", "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}.jpg`;
};

let originalBytes = 0;
let thumbnailBytes = 0;
let fullBytes = 0;
let imageCount = 0;

for (const { name: collection, sourceDirectory, keepBackup } of collections) {
  const backupDirectory = path.join(backupRoot, collection);
  const thumbnailDirectory = path.join(optimizedRoot, "thumb", collection);
  const fullDirectory = path.join(optimizedRoot, "full", collection);

  await Promise.all([
    keepBackup ? mkdir(backupDirectory, { recursive: true }) : Promise.resolve(),
    mkdir(thumbnailDirectory, { recursive: true }),
    mkdir(fullDirectory, { recursive: true }),
  ]);

  for (const publicFile of await jpegFiles(sourceDirectory)) {
    const fileName = outputName(publicFile, collection);
    const backupFile = path.join(backupDirectory, fileName);
    const thumbnailFile = path.join(thumbnailDirectory, fileName);
    const fullFile = path.join(fullDirectory, fileName);

    if (keepBackup && !(await fileExists(backupFile))) {
      await copyFile(publicFile, backupFile);
    }

    const sourceFile = keepBackup ? backupFile : publicFile;

    const metadata = await sharp(sourceFile).metadata();
    const originalSize = (await stat(sourceFile)).size;

    await sharp(sourceFile)
      .rotate()
      .resize({ width: 720, withoutEnlargement: true })
      .withIccProfile("srgb")
      .jpeg({ quality: 80, progressive: true, mozjpeg: true })
      .toFile(thumbnailFile);

    await sharp(sourceFile)
      .rotate()
      .resize({ width: 2000, withoutEnlargement: true })
      .withIccProfile("srgb")
      .jpeg({ quality: 86, progressive: true, mozjpeg: true })
      .toFile(fullFile);

    originalBytes += originalSize;
    thumbnailBytes += (await stat(thumbnailFile)).size;
    fullBytes += (await stat(fullFile)).size;
    imageCount += 1;

    if (!metadata.width || !metadata.height) {
      throw new Error(`Could not read image dimensions: ${sourceFile}`);
    }
  }
}

const megabytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

console.log(`Optimized ${imageCount} images.`);
console.log(`Originals: ${megabytes(originalBytes)}`);
console.log(`Thumbnails: ${megabytes(thumbnailBytes)}`);
console.log(`Lightbox images: ${megabytes(fullBytes)}`);
