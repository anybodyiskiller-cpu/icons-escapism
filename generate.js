const fs = require("fs");
const path = require("path");

// ====================== 生成普通图标 JSON ======================
function generateMainIcons() {
  const ICON_DIR = "./icons";
  const files = fs.readdirSync(ICON_DIR)
    .filter(file => file.toLowerCase().endsWith('.png'))
    .sort();

  const icons = files.map(file => {
    const name = path.basename(file, '.png').replace(/[-_]/g, ' ').trim();
    return {
      name: name,
      url: `https://raw.githubusercontent.com/anybodyiskiller-cpu/icons-escapism/main/icons/${file}`,
      category: "default"
    };
  });

  fs.writeFileSync("./icons.json", JSON.stringify({ name: "Escapism Icon Pack", icons }, null, 2));
  console.log(`✅ icons.json 生成完成！共 ${icons.length} 个图标`);
}

// ====================== 生成国旗专用 JSON ======================
function generateFlags() {
  const FLAGS_DIR = "./flags";
  
  if (!fs.existsSync(FLAGS_DIR)) {
    console.log("⚠️ flags 文件夹不存在，请先创建");
    return;
  }

  const files = fs.readdirSync(FLAGS_DIR)
    .filter(file => file.toLowerCase().endsWith('.png'))
    .sort();

  const flags = files.map(file => {
    const name = path.basename(file, '.png').toUpperCase();
    return {
      name: name,
      url: `https://raw.githubusercontent.com/anybodyiskiller-cpu/icons-escapism/main/flags/${file}`,
      category: "flags"
    };
  });

  fs.writeFileSync("./flags.json", JSON.stringify({ name: "Escapism Flags Pack", icons: flags }, null, 2));
  console.log(`✅ flags.json 生成完成！共 ${flags.length} 个国旗`);
}

// 执行
generateMainIcons();
generateFlags();
