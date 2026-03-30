console.log("📂 当前目录文件夹结构:", fs.readdirSync("./"));
const fs = require("fs");
const path = require("path");

const ICON_DIR = "./icons";
const OUTPUT = "./icons.json";

function getIcons() {
  if (!fs.existsSync(ICON_DIR)) return [];

  const files = fs.readdirSync(ICON_DIR);

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

console.log("icons.json 已生成");
