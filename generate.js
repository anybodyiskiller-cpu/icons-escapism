const fs = require("fs");
const path = require("path");

const ICON_DIR = "./icons";
const OUTPUT = "./icons.json";

console.log("🚀 生成 icons.json...");

const files = fs.readdirSync(ICON_DIR)
  .filter(file => file.toLowerCase().endsWith('.png'))
  .sort();

const icons = files.map(file => {
  const name = path.basename(file, '.png')
    .replace(/[-_]/g, ' ')
    .trim();

  return {
    "name": name,           // 显示名称
    "url": `https://raw.githubusercontent.com/anybodyiskiller-cpu/icons-escapism/main/icons/${file}`,
    "path": `icons/${file}` // 部分 App 需要这个字段
  };
});

fs.writeFileSync(OUTPUT, JSON.stringify(icons, null, 2));
console.log(`✅ 生成完成！共 ${icons.length} 个图标`);
