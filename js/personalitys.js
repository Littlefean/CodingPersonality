window.onload = function () {
  // 计算分析类  AP
  // 后端业务类  AC
  // 前端交互类  VP
  // 游戏全栈类  VC
  const types = ["AP", "AC", "VP", "VC"];

  console.log(PERSONALITY);
  for (let personTag in PERSONALITY) {
    for (let typeName of types) {
      if (personTag.includes(typeName[0]) && personTag.includes(typeName[1])) {
        const typeSection = document.querySelector(`main .${typeName}`);
        typeSection.appendChild(buildPersonCardElement(personTag));
      }
    }
  }
  // 彩蛋人格
  const EasterEggSection = document.querySelector(`main .EasterEgg`);
  for (let typeName of ['LazyCoder', 'EfficiencyMaster', 'Hacker', 'BugHunter']) {
    EasterEggSection.appendChild(buildPersonCardElement(typeName));
  }
};

/**
 * 创建一张人物卡片 元素
 * tag是四个大写字母组成的字符串
 */
function buildPersonCardElement(tag) {
  const res = document.createElement("section");
  res.classList.add("person-card");

  const img = document.createElement("img");
  img.src = `./img/${tag}.png`;
  res.appendChild(img);

  const h3 = document.createElement("h3");
  h3.innerHTML = PERSONALITY[tag].name;
  res.appendChild(h3);

  const h4 = document.createElement("h4");
  h4.innerHTML = tag;
  res.appendChild(h4);

  const p = document.createElement("p");
  p.innerHTML = PERSONALITY[tag].motto;
  res.appendChild(p);

  return res;
}
