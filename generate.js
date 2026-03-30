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
    "name": name,
    "url": `https://raw.githubusercontent.com/anybodyiskiller-cpu/icons-escapism/main/icons/${file}`
  };
});

// 关键修改：包一层对象，很多 App 要求这样
const result = {
  "name": "My Icon Pack",     // 可以随便改
  "icons": icons
};

fs.writeFileSync(OUTPUT, JSON.stringify(result, null, 2));
console.log(`✅ 生成完成！共 ${icons.length} 个图标`);
