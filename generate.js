const fs = require("fs");
const path = require("path");

console.log("🚀 开始生成 JSON 文件...");

const CONFIG = {
  GITHUB_USER: "anybodyiskiller-cpu",
  GITHUB_REPO: "icons-escapism",
  BRANCH: "main",
  USE_MINIFY: true,
};

const COLLECTIONS = [
  {
    folder: "icons",
    output: "icons.json",
    name: "AppStore Icons",
    description: "iOS 图标库\n持续更新中"
  },
  {
    folder: "flags",
    output: "flags.json",
    name: "Flags / 旗帜",
    description: "各国方块圆角旗帜图标库"
  },
  {
    folder: "music",
    output: "music.json",
    name: "Music / 音乐封面",
    description: "音乐专辑封面 & 歌手图标\n可无视尺寸差异"
  }
];

function processCollection(col) {
  const dir = `./${col.folder}`;
  if (!fs.existsSync(dir)) {
    console.log(`⚠️ 文件夹 ${col.folder} 不存在，跳过`);
    return;
  }

  const files = fs.readdirSync(dir)
    .filter(f => f.toLowerCase().endsWith('.png'))
    .sort();

  const icons = files.map(file => {
    let name = path.basename(file, path.extname(file));
    name = name
      .replace(/[-_]/g, ' ')
      .replace(/[^a-zA-Z0-9\u4e00-\u9fa5 ]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    return {
      name: name,
      url: `https://raw.githubusercontent.com/${CONFIG.GITHUB_USER}/${CONFIG.GITHUB_REPO}/${CONFIG.BRANCH}/${col.folder}/${file}`
    };
  });

  const data = {
    name: col.name,
    description: col.description,
    icons: icons
  };

  const jsonString = CONFIG.USE_MINIFY ? JSON.stringify(data) : JSON.stringify(data, null, 2);
  fs.writeFileSync(col.output, jsonString);

  console.log(`✅ ${col.output} 生成完成！共 ${icons.length} 个图标`);
}

COLLECTIONS.forEach(processCollection);

console.log("🎉 全部 JSON 生成完毕！");
