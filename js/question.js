/**
 * 题目类
 * 在此js被加载之前请先注意加载personality.js文件。引用到内部的一个全局变量
 */
class Question {
  constructor(content) {
    // 题目
    this.content = content;
    // 当前用户选择的分值
    this.currentValue = 0;
    // 对应的element
    this.element = null;
    this.generateElement();
  }

  /**
   * 此方法只在第一次调用有效，确保元素绑定的唯一性
   * element
   *    p   题目
   *    div
   *      button * 5
   *    span   非常反对，比较反对，轻微反对，中立，轻微赞成，比较赞成，非常赞成
   */
  generateElement() {
    if (this.element) {
      return;
    }
    let element = document.createElement("section");
    // 题目
    let content = document.createElement("p");
    content.classList.add("content");
    content.innerText = this.content;
    element.appendChild(content);
    // 同意
    let spanAgree = document.createElement('span');
    spanAgree.classList.add("describe");
    spanAgree.innerText = '同意';
    element.appendChild(spanAgree);

    // 多个按钮组
    let buttonList = document.createElement("div");
    buttonList.classList.add("buttons");
    for (let i = 0; i < 7; i++) {
      // 生成每个按钮
      let btn = document.createElement("button");
      btn.classList.add(`button-${i}`);
      btn.onclick = () => {
        this.currentValue = i - 3;
        // 修改样式
        for (let otherBtn of buttonList.children) {
          otherBtn.classList.remove('activate');
        }
        btn.classList.add('activate');
      };
      buttonList.appendChild(btn);
    }
    element.appendChild(buttonList);

    // 反对
    let spanDisagree = document.createElement('span');
    spanDisagree.classList.add("describe");
    spanDisagree.innerText = '反对';
    element.appendChild(spanDisagree);

    this.element = element;
  }
}
