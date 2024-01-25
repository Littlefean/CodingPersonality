window.onload = function () {
  // 加载所有题目，并渲染组件
  const mainElement = document.querySelector('main');

  const questionObjectList = [];
  for (const questionJson of QUESTION_ARRAY) {
    let questionObject = new Question(questionJson.content);  
    questionObjectList.push(questionObject);
  }

  for (let question of questionObjectList) {
    console.log(question.element);
    mainElement.appendChild(question.element);
  }

};
