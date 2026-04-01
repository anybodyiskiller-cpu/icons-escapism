const fs = require("fs");
const path = require("path");

console.log("🚀 开始生成 JSON 文件...");

// ==================== 处理 icons ====================
const ICON_DIR = "./icons";
const ICON_OUTPUT = "./icons.json";

if (fs.existsSync(ICON_DIR)) {
  const iconFiles = fs.readdirSync(ICON_DIR)
    .filter(f => f.toLowerCase().endsWith('.png'))
    .sort();

  const icons = iconFiles.map(file => ({
    name: path.basename(file, '.png').replace(/[-_]/g, ' ').trim(),
    url: `https://raw.githubusercontent.com/anybodyiskiller-cpu/icons-escapism/main/icons/${file}`
  }));

  fs.writeFileSync(ICON_OUTPUT, JSON.stringify({ name: "App Icons", icons }, null, 2));
  console.log(`✅ icons.json 生成完成！共 ${icons.length} 个`);
}

// ==================== 独立处理 flags ====================
const FLAGS_DIR = "./flags";
const FLAGS_OUTPUT = "./flags.json";

if (fs.existsSync(FLAGS_DIR)) {
  const flagFiles = fs.readdirSync(FLAGS_DIR)
    .filter(f => f.toLowerCase().endsWith('.png'))
    .sort();

  const flags = flagFiles.map(file => ({
    name: path.basename(file, '.png').toUpperCase(),
    url: `https://raw.githubusercontent.com/anybodyiskiller-cpu/icons-escapism/main/flags/${file}`
  }));

  fs.writeFileSync(FLAGS_OUTPUT, JSON.stringify({ name: "Flags / 旗帜", flags }, null, 2));
  console.log(`✅ flags.json 生成完成！共 ${flags.length} 个`);
}

console.log("🎉 全部完成！");
