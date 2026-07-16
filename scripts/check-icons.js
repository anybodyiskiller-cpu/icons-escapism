const fs = require("fs");
const path = require("path");

const ICONS_DIR = path.join(__dirname, "..", "icons");
const MAX_DIMENSION = 144;
const MAX_FILE_SIZE = 100 * 1024;
const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

const files = fs.readdirSync(ICONS_DIR, { withFileTypes: true })
  .filter(entry => entry.isFile())
  .map(entry => entry.name)
  .sort();

const errors = [];
let pngCount = 0;
let totalBytes = 0;

for (const file of files) {
  const filePath = path.join(ICONS_DIR, file);

  if (path.extname(file).toLowerCase() !== ".png") {
    errors.push(`${file}: only PNG files are allowed in icons/`);
    continue;
  }

  const data = fs.readFileSync(filePath);
  pngCount += 1;
  totalBytes += data.length;

  if (data.length < 26 || !data.subarray(0, 8).equals(PNG_SIGNATURE)) {
    errors.push(`${file}: invalid PNG signature or truncated header`);
    continue;
  }

  const width = data.readUInt32BE(16);
  const height = data.readUInt32BE(20);
  const bitDepth = data[24];

  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    errors.push(`${file}: ${width}x${height} exceeds ${MAX_DIMENSION}x${MAX_DIMENSION}`);
  }

  if (bitDepth !== 8) {
    errors.push(`${file}: ${bitDepth}-bit PNG must be converted to 8-bit`);
  }

  if (data.length > MAX_FILE_SIZE) {
    errors.push(`${file}: ${data.length} bytes exceeds ${MAX_FILE_SIZE} bytes`);
  }
}

if (errors.length > 0) {
  console.error("Icon validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Validated ${pngCount} icons: <=${MAX_DIMENSION}px, 8-bit PNG, ` +
  `<=${MAX_FILE_SIZE / 1024} KiB each, ${(totalBytes / 1024 / 1024).toFixed(2)} MiB total`
);
