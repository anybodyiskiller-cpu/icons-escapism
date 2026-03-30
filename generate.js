const fs = require("fs");
const path = require("path");

const ICON_DIR = "./icons";
const OUTPUT = "./icons.json";

console.log("开始生成 icons.json...");

if (!fs.existsSync(ICON_DIR)) {
  console.error("❌ icons 文件夹不存在！");
  process.exit(1);
}

const files = fs.readdirSync(ICON_DIR)
  .filter(file => file.toLowerCase().endsWith('.png'));

console.log(`找到 ${files.length} 个 PNG 图标`);

const icons = files.map(file => {
  const name = path.basename(file, '.png')
                 .replace(/[-_]/g, ' ')   // 可选：把下划线空格转成空格
                 .trim();
  
  return {
    name: name,                    // 显示名称
    url: `https://raw.githubusercontent.com/anybodyiskiller-cpu/icons-escapism/main/icons/${file}`,
    // 或者用相对路径（部分 App 支持）：
    // path: `icons/${file}`
  };
});

fs.writeFileSync(OUTPUT, JSON.stringify(icons, null, 2));
console.log(`✅ 生成成功！共 ${icons.length} 个图标 → ${OUTPUT}`);
