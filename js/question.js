/**
 * 题目类
 *
 */
class Question {
  constructor(staticObject) {
    // 题目
    this.staticObject = staticObject;
    // 当前用户选择的分值
    this.currentValue = 0;
    // 对应的element
    this.element = null;
    this.generateElement();
    // 题目是否是作答了的状态
    this.isFinish = false;
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
    // 题目区域
    let content = document.createElement("p");
    content.classList.add("content");
    content.innerText = this.staticObject.content;
    element.appendChild(content);
    // 输入区域
    let inputArea = document.createElement("div");
    inputArea.classList.add("input-area");
    // 同意
    let spanAgree = document.createElement("span");
    spanAgree.classList.add("describe");
    spanAgree.classList.add("agree");
    spanAgree.innerText = "同意";
    inputArea.appendChild(spanAgree);

    // 多个按钮组
    let buttonList = document.createElement("div");
    buttonList.classList.add("buttons");
    for (let i = 0; i < 7; i++) {
      // 生成每个按钮
      let btn = document.createElement("button");
      btn.classList.add(`button-${i}`);
      btn.onclick = () => {
        this.currentValue = -(i - 3); // 左侧同意，右侧反对
        // 修改样式
        for (let otherBtn of buttonList.children) {
          otherBtn.classList.remove("activate");
        }
        btn.classList.add("activate");
        // 只要一点，就算作答了
        this.isFinish = true;
        element.style.opacity = "0.5"; // 作答之后变浅色
      };
      buttonList.appendChild(btn);
    }
    inputArea.appendChild(buttonList);

    // 反对
    let spanDisagree = document.createElement("span");
    spanDisagree.classList.add("describe");
    spanDisagree.classList.add("disagree");
    spanDisagree.innerText = "反对";
    inputArea.appendChild(spanDisagree);

    element.appendChild(inputArea);
    this.element = element;
  }
}
