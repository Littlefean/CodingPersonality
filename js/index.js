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
    const bindElement = (element, tag, name, describe) => {
      element.querySelector(".tag").innerHTML = tag;
      element.querySelector(".name").innerHTML = name;
      element.querySelector("img").src = `./img/${tag}.png`;
      element.querySelector("img").alt = name;
      element.querySelector(".describe").innerHTML = describe;
    };

    const finalResultElement = document.querySelector("article.result .final");
    const potentialResultElement = document.querySelector("article.result .potential");
    console.log(potentialResultElement);
    bindElement(
      finalResultElement,
      finalTag,
      PERSONALITY[finalTag].name,
      PERSONALITY[finalTag].describe
    );
    bindElement(
      potentialResultElement,
      potentialTag,
      PERSONALITY[potentialTag].name,
      PERSONALITY[potentialTag].describe
    );
  };
};
