const fs = require("fs");
const path = require("path");

console.log("🚀 开始生成 JSON 文件...");

// ====================== 【可修改配置区】======================
// 以后你主要改这里就够了

const CONFIG = {
  GITHUB_USER: "anybodyiskiller-cpu",
  GITHUB_REPO: "icons-escapism",
  BRANCH: "main",

  // ==================== icons 配置 ====================
  ICON_DIR: "./icons",
  ICON_OUTPUT: "./icons.json",
  ICON_COLLECTION_NAME: "AppStore Icons",     // 标题
  
  // ←←← 这里就是你想要的「标题下面的自定义文字」←←←
  ICON_DESCRIPTION: "escapism 个人精选 iOS 图标库\n持续更新中",

  // ==================== flags 配置 ====================
  FLAGS_DIR: "./flags",
  FLAGS_OUTPUT: "./flags.json",
  FLAGS_COLLECTION_NAME: "Flags / 旗帜",
  FLAGS_DESCRIPTION: "escapism 的各国旗帜图标库",
  
  USE_MINIFY: true,          // 推荐保持 true（压缩格式更稳定）
  ESCAPE_URL: false,         // 大部分情况保持 false 即可
};

// ====================== 生成 icons.json ======================
if (fs.existsSync(CONFIG.ICON_DIR)) {
  const iconFiles = fs.readdirSync(CONFIG.ICON_DIR)
    .filter(f => f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.PNG'))
    .sort();

  const icons = iconFiles.map(file => {
    let name = path.basename(file, path.extname(file));
    name = name
      .replace(/[-_]/g, ' ')
      .replace(/[^a-zA-Z0-9\u4e00-\u9fa5 ]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    return {
      name: name,
      url: `https://raw.githubusercontent.com/${CONFIG.GITHUB_USER}/${CONFIG.GITHUB_REPO}/${CONFIG.BRANCH}/icons/${file}`
    };
  });

  const iconsData = {
    name: CONFIG.ICON_COLLECTION_NAME,
    description: CONFIG.ICON_DESCRIPTION,     // ← 这行就是关键
    icons: icons
  };

  const jsonString = CONFIG.USE_MINIFY ? JSON.stringify(iconsData) : JSON.stringify(iconsData, null, 2);
  fs.writeFileSync(CONFIG.ICON_OUTPUT, jsonString);
  
  console.log(`✅ icons.json 生成完成！共 ${icons.length} 个图标`);
  console.log(`   标题: ${CONFIG.ICON_COLLECTION_NAME}`);
  console.log(`   描述: ${CONFIG.ICON_DESCRIPTION}`);
}

// ====================== 生成 flags.json ======================
if (fs.existsSync(CONFIG.FLAGS_DIR)) {
  const flagFiles = fs.readdirSync(CONFIG.FLAGS_DIR)
    .filter(f => f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.PNG'))
    .sort();

  const flagIcons = flagFiles.map(file => ({
    name: path.basename(file, path.extname(file)).toUpperCase().replace(/[-_]/g, ''),
    url: `https://raw.githubusercontent.com/${CONFIG.GITHUB_USER}/${CONFIG.GITHUB_REPO}/${CONFIG.BRANCH}/flags/${file}`
  }));

  const flagsData = {
    name: CONFIG.FLAGS_COLLECTION_NAME,
    description: CONFIG.FLAGS_DESCRIPTION,
    icons: flagIcons
  };

  const jsonString = CONFIG.USE_MINIFY ? JSON.stringify(flagsData) : JSON.stringify(flagsData, null, 2);
  fs.writeFileSync(CONFIG.FLAGS_OUTPUT, jsonString);
  
  console.log(`✅ flags.json 生成完成！共 ${flagIcons.length} 个`);
}

console.log("🎉 所有 JSON 生成完毕！");