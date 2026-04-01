const fs = require("fs");
const path = require("path");

// 处理 icons
const ICON_DIR = "./icons";
const ICON_OUTPUT = "./icons.json";

console.log("🚀 生成 icons.json...");
const iconFiles = fs.readdirSync(ICON_DIR)
  .filter(file => file.toLowerCase().endsWith('.png'))
  .sort();

const icons = iconFiles.map(file => ({
  "name": path.basename(file, '.png').replace(/[-_]/g, ' ').trim(),
  "url": `https://raw.githubusercontent.com/anybodyiskiller-cpu/icons-escapism/main/icons/${file}`
}));

fs.writeFileSync(ICON_OUTPUT, JSON.stringify({ "name": "My Icon Pack", "icons": icons }, null, 2));
console.log(`✅ icons.json 生成完成！共 ${icons.length} 个`);

// 处理 flags（新增部分）
const FLAGS_DIR = "./flags";
const FLAGS_OUTPUT = "./flags.json";

if (fs.existsSync(FLAGS_DIR)) {
  console.log("🚀 生成 flags.json...");
  const flagFiles = fs.readdirSync(FLAGS_DIR)
    .filter(file => file.toLowerCase().endsWith('.png'))
    .sort();

  const flags = flagFiles.map(file => ({
    "name": path.basename(file, '.png').toUpperCase(),
    "url": `https://raw.githubusercontent.com/anybodyiskiller-cpu/icons-escapism/main/flags/${file}`
  }));

  fs.writeFileSync(FLAGS_OUTPUT, JSON.stringify({ "name": "Flags", "flags": flags }, null, 2));
  console.log(`✅ flags.json 生成完成！共 ${flags.length} 个`);
}
