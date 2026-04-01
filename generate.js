const fs = require("fs");
const path = require("path");

// ==================== 处理 icons（保持不变） ====================
const ICON_DIR = "./icons";
const ICON_OUTPUT = "./icons.json";

if (fs.existsSync(ICON_DIR)) {
  console.log("🚀 正在生成 icons.json...");
  const iconFiles = fs.readdirSync(ICON_DIR)
    .filter(file => file.toLowerCase().endsWith('.png'))
    .sort();

  const icons = iconFiles.map(file => ({
    name: path.basename(file, '.png').replace(/[-_]/g, ' ').trim(),
    url: `https://raw.githubusercontent.com/anybodyiskiller-cpu/icons-escapism/main/icons/${file}`
  }));

  fs.writeFileSync(ICON_OUTPUT, JSON.stringify({ 
    name: "App Icons", 
    icons: icons 
  }, null, 2));
  
  console.log(`✅ icons.json 生成完成！共 ${icons.length} 个图标`);
}

// ==================== 独立处理 flags（新增） ====================
const FLAGS_DIR = "./flags";
const FLAGS_OUTPUT = "./flags.json";

if (fs.existsSync(FLAGS_DIR)) {
  console.log("🚀 正在生成 flags.json...");
  const flagFiles = fs.readdirSync(FLAGS_DIR)
    .filter(file => file.toLowerCase().endsWith('.png'))
    .sort();

  const flags = flagFiles.map(file => ({
    name: path.basename(file, '.png').toUpperCase(),   // 旗帜名称用大写
    url: `https://raw.githubusercontent.com/anybodyiskiller-cpu/icons-escapism/main/flags/${file}`
  }));

  fs.writeFileSync(FLAGS_OUTPUT, JSON.stringify({ 
    name: "Flags / 旗帜", 
    flags: flags 
  }, null, 2));
  
  console.log(`✅ flags.json 生成完成！共 ${flags.length} 个旗帜`);
}

console.log("🎉 所有 JSON 文件生成完毕！");
