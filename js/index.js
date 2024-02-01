window.onload = function () {
  // 加载所有题目，并渲染组件
  const mainElement = document.querySelector("main");

  const questionObjectList = [];
  for (const questionJson of QUESTION_ARRAY) {
    let questionObject = new Question(questionJson);
    questionObjectList.push(questionObject);
  }

  for (let question of questionObjectList) {
    mainElement.appendChild(question.element);
  }

  // 做完题的加载方法
  const submitButton = document.querySelector(".submit");
  submitButton.onclick = function () {
    for (const question of questionObjectList) {
      if (!question.isFinish) {
        alert("还有题目没有做完");
        return;
      }
    }
    // 将结果区域显示
    document.querySelector("article.result").style.display = "block";

    const finalResult = {
      AV: 0,
      FE: 0,
      RQ: 0,
      PC: 0,
    };
    const potentialResult = {
      AV: 0,
      FE: 0,
      RQ: 0,
      PC: 0,
    };

    const easterEggResult = {
      LazyCoder: 0,
      EfficiencyMaster: 0,
      Hacker: 0,
      BugHunter: 0,
    }
    const dimensionList = ["AV", "FE", "RQ", "PC"];
    const easterEggDimensionList = ['LazyCoder', 'EfficiencyMaster', 'Hacker', "BugHunter"];

    for (let question of questionObjectList) {
      console.log(question.currentValue);
      let currentValue = question.currentValue;

      for (const dimension of dimensionList) {
        const f = question.staticObject[dimension];
        if (!f) {
          continue;
        }
        if (question.staticObject.potential) {
          potentialResult[dimension] += f(currentValue);
        } else {
          finalResult[dimension] += f(currentValue);
        }
      }

      // 计算彩蛋人格，累加结果

      for (const easterEggName of easterEggDimensionList) {
        const f = question.staticObject[easterEggName];
        if (!f) {
          continue;
        }
        easterEggResult[easterEggName] += f(question.currentValue);
      }
    }
    // 累加完毕
    console.log(finalResult);
    console.log(potentialResult);
    console.log(easterEggResult);

    // 计算最终标签
    let finalTag = "";
    // 以及潜在人格标签
    let potentialTag = "";
    for (const dimension of dimensionList) {
      finalTag += finalResult[dimension] > 0 ? dimension[1] : dimension[0];
      potentialTag +=
        potentialResult[dimension] > 0 ? dimension[1] : dimension[0];
    }
    // 计算菜蛋人格 Tag，计算方式就是直接找出最大分
    let easterEggTag = findMaxKey(easterEggResult);


    console.log(finalTag);
    console.log(potentialTag);
    console.log(easterEggTag);

    const bindBaseResultInElement = (element, tag, jsonData) => {
      element.querySelector(".tag").innerHTML = tag;
      element.querySelector(".name").innerHTML = jsonData.name;
      element.querySelector("img").src = `./img/${tag}.png`;
      element.querySelector("img").alt = jsonData.name;
      element.querySelector(".describe").innerHTML = jsonData.describe;
      element.querySelector(".motto").innerHTML = jsonData.motto;
      element.querySelector(".advantage").innerHTML = jsonData.advantage;
      element.querySelector(".inferiority").innerHTML = jsonData.inferiority;
      element.querySelector(".recommendation").innerHTML = jsonData.recommendation;
    }

    /**
     * 绑定函数
     * @param element 要渲染的结果区域的盒子
     * @param tag 标签字母代号
     * @param jsonData PERSONALITY[tag]
     * @param result
     */
    const bindElement = (element, tag, jsonData, result) => {
      bindBaseResultInElement(element, tag, jsonData);
      const sigmoid = (x) => 1 / (1 + Math.exp(-x));

      for (const dimension of dimensionList) {
        const rightRate = sigmoid(result[dimension]);
        const leftRate = 1 - rightRate;
        // 填充文字
        {
          const dimensionEle = element.querySelector(`p.${dimension}`);
          const leftEle = dimensionEle.querySelector(".left");
          const rightEle = dimensionEle.querySelector(".right");
          leftEle.innerHTML = `${(leftRate * 100).toFixed(1)}%`;
          rightEle.innerHTML = `${(rightRate * 100).toFixed(1)}%`;
        }

        // 填充进度条
        {
          const dimensionEle = element.querySelector(`div.${dimension}`);
          const leftEle = dimensionEle.querySelector(".left");
          const rightEle = dimensionEle.querySelector(".right");
          leftEle.style.width = `${leftRate * 100}%`;
          rightEle.style.width = `${rightRate * 100}%`;
        }
      }
    };

    const finalResultElement = document.querySelector("article.result .final");
    const potentialResultElement = document.querySelector(
      "article.result .potential"
    );


    console.log(potentialResultElement);
    bindElement(
      finalResultElement,
      finalTag,
      PERSONALITY[finalTag],
      finalResult
    );
    bindElement(
      potentialResultElement,
      potentialTag,
      PERSONALITY[potentialTag],
      potentialResult
    );
    // 绑定彩蛋人格
    const easterEggResultElement = document.querySelector("article.result .easter-egg");
    bindBaseResultInElement(easterEggResultElement, easterEggTag, PERSONALITY[easterEggTag]);
  };
};

/**
 * 返回对象值最大的键
 * @param obj
 * @returns {null}
 */
function findMaxKey(obj) {
    let maxKey = null;
    let maxValue = -Infinity;

    for (const key in obj) {
        if (obj[key] > maxValue) {
            maxValue = obj[key];
            maxKey = key;
        }
    }

    return maxKey;
}