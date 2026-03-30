const fs = require("fs");
const path = require("path");

console.log("📂 当前目录文件夹结构:", fs.readdirSync("./"));

const ICON_DIR = "./icons";
const OUTPUT = "./icons.json";

function getIcons() {
  if (!fs.existsSync(ICON_DIR)) {
    console.log("⚠️ icons 文件夹不存在");
    return [];
  }
  
  const files = fs.readdirSync(ICON_DIR);
  console.log(`找到 ${files.length} 个文件`);

  return files
    .filter(file => file.endsWith(".png"))
    .map(file => {
      const name = path.basename(file, ".png");
      return {
        name,
        file,
        path: `icons/${file}`
      };
    });
}

const icons = getIcons();
fs.writeFileSync(OUTPUT, JSON.stringify(icons, null, 2));

console.log(`✅ icons.json 已生成，共 ${icons.length} 个图标`);
