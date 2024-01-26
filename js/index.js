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
    // todo 检查所有题目是否填上了。
    for (const question of questionObjectList) {
      if (!question.isFinish) {
        alert("还有题目没有做完");
        return;
      }
    }

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
    const dimensionList = ["AV", "FE", "RQ", "PC"];
    for (let question of questionObjectList) {
      console.log(question.currentValue);

      for (const dimension of dimensionList) {
        let currentValue = question.currentValue;
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
    }
    // 累加完毕
    console.log(finalResult);
    console.log(potentialResult);

    // 计算最终标签
    let finalTag = "";
    let potentialTag = "";
    for (const dimension of dimensionList) {
      finalTag += finalResult[dimension] > 0 ? dimension[1] : dimension[0];
      potentialTag +=
        potentialResult[dimension] > 0 ? dimension[1] : dimension[0];
    }

    console.log(finalTag);
    console.log(potentialTag);
    // 绑定函数
    const bindElement = (element, tag, jsonData, result) => {
      element.querySelector(".tag").innerHTML = tag;
      element.querySelector(".name").innerHTML = jsonData.name;
      element.querySelector("img").src = `./img/${tag}.png`;
      element.querySelector("img").alt = jsonData.name;
      element.querySelector(".describe").innerHTML = jsonData.describe;
      element.querySelector(".motto").innerHTML = jsonData.motto;
      element.querySelector(".advantage").innerHTML = jsonData.advantage;
      element.querySelector(".inferiority").innerHTML = jsonData.inferiority;
      element.querySelector(".recommendation").innerHTML =
        jsonData.recommendation;
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
  };
};
