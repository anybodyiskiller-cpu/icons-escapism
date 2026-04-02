const fs = require("fs");
const path = require("path");

console.log("🚀 开始生成 JSON 文件...");

// ==================== 处理 icons ====================
const ICON_DIR = "./icons";
const ICON_OUTPUT = "./icons.json";

if (fs.existsSync(ICON_DIR)) {
  const iconFiles = fs.readdirSync(ICON_DIR)
    .filter(f => f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.PNG'))
    .sort();

  const icons = iconFiles.map(file => {
    let name = path.basename(file, path.extname(file));   // 去掉扩展名
    
    // 清理名称：移除多余符号，转空格，清理多余空格
    name = name
      .replace(/[-_]/g, ' ')           // - 和 _ 转空格
      .replace(/[^a-zA-Z0-9\u4e00-\u9fa5 ]/g, '') // 只保留字母、数字、中文、空格
      .replace(/\s+/g, ' ')            // 多个空格合并成一个
      .trim();

    return {
      name: name,
      url: `https://raw.githubusercontent.com/anybodyiskiller-cpu/icons-escapism/main/icons/${file}`
    };
  });

  const iconsData = {
    name: "Ios 26 AppStore Icons",
    icons: icons
  };

  // 使用压缩格式（推荐给 Surge 使用）
  fs.writeFileSync(ICON_OUTPUT, JSON.stringify(iconsData));
  console.log(`✅ icons.json 生成完成！共 ${icons.length} 个图标`);
}

// ==================== 处理 flags ====================
const FLAGS_DIR = "./flags";
const FLAGS_OUTPUT = "./flags.json";

if (fs.existsSync(FLAGS_DIR)) {
  const flagFiles = fs.readdirSync(FLAGS_DIR)
    .filter(f => f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.PNG'))
    .sort();

  const flagIcons = flagFiles.map(file => {
    let name = path.basename(file, path.extname(file));
    
    // 旗帜建议保留国家/地区代码风格，推荐简洁大写
    name = name.toUpperCase().replace(/[-_]/g, '');

    return {
      name: name,
      url: `https://raw.githubusercontent.com/anybodyiskiller-cpu/icons-escapism/main/flags/${file}`
    };
  });

  const flagsData = {
    name: "Flags / 旗帜",
    description: "escapism的旗帜图标库",
    icons: flagIcons
  };

  fs.writeFileSync(FLAGS_OUTPUT, JSON.stringify(flagsData));
  console.log(`✅ flags.json 生成完成！共 ${flagIcons.length} 个`);
}

console.log("🎉 所有 JSON 文件生成完毕！");