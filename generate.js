const fs = require("fs");
const path = require("path");

const ICON_DIR = "./icons";
const OUTPUT = "./icons.json";

const categories = fs.readdirSync(ICON_DIR)
  .filter(dir => fs.statSync(path.join(ICON_DIR, dir)).isDirectory());

let allIcons = [];

// 处理每个分类文件夹（flags 和以后可能加的其他分类）
categories.forEach(category => {
  const dirPath = path.join(ICON_DIR, category);
  const files = fs.readdirSync(dirPath)
    .filter(file => file.toLowerCase().endsWith('.png'))
    .sort();

  files.forEach(file => {
    const name = path.basename(file, '.png')
      .replace(/[-_]/g, ' ')
      .trim();

    allIcons.push({
      "name": `${category}/${name}`,
      "url": `https://raw.githubusercontent.com/anybodyiskiller-cpu/icons-escapism/main/icons/${category}/${file}`,
      "category": category
    });
  });
});

const result = {
  "name": "Escapism Icon Pack",
  "icons": allIcons
};

fs.writeFileSync(OUTPUT, JSON.stringify(result, null, 2));
console.log(`✅ 生成完成！共 ${allIcons.length} 个图标（含 flags 文件夹）`);
