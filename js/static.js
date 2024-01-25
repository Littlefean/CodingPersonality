/**
 * 题目分为两种类型，目前的情况 和 想要的、认为的
 * 分别对应 人格 和 潜在人格
 * 当这个题目是测试潜在人格的时候，potential=true
 *
 * RQ 保证质量
 * PC 保证功能，牺牲性能  的程度函数
 * FE 不专精保证探索
 * AV 不抽象喜欢形象交互
 *
 * 函数说明，
 * 通常为一个一次函数，
 * x的输入值可能是 -3 ~ 3 整数。
 * 表示同意的程度
 * 返回值表示最终要加成多少或者减少多少，在-1~+1之间
 */

const QUESTION_ARRAY = [
  {
    content: "在面临一个紧急的项目交付期限时，你即使超时完成也会注重完成质量",
    RQ: (x) => 0.25 * x,
  },
  {
    content: "你认为程序写出bug是正常的事情，当被别人指出时不会羞耻和尴尬",
    potential: true,
    RQ: (x) => -0.1 * x,
  },
  {
    content:
      "你完成了一个新功能的开发，但在代码审查中发现有一些潜在的优化和改进的地方，你愿意花更多时间进行全面的代码优化，以确保高质量。",
    RQ: (x) => 0.2 * (x + 1.5),
  },
  {
    content: "你认为如果一件事情做的很差，那还不如不做",
    RQ: (x) => 0.3 * x,
  },
  {
    content: "你认为做一件事情，无论做的再差劲，总比什么都不做强",
    RQ: (x) => -0.1 * x,
  },
  {
    content:
      "项目引入一项新技术，但这可能导致学习曲线和一些额外的开发时间。你希望希望尽快引入新技术，即使牺牲一些质量。",
    // -3  -2  -1  00  +1  +2  +3
    // 0.5 0.25 0  -0.25 ..... -0.4
    RQ: (x) => -0.2 * x,
    FE: (x) => 0.025 * (x - 3) ** 2 - 0.4,
  },
  {
    content: "你感觉算法比较复杂难懂",
    PC: (x) => 0.2 * x,
    AV: (x) => 0.3 * x,
  },
  {
    content: "你经常参加算法竞赛",
    PC: (x) => -0.1 * x,
    FE: (x) => 0.02 * x,
    AV: (x) => -0.2 * x,
    RQ: (x) => -0.01 * x,
  },
  {
    content: "你希望未来的项目中能多多涉及算法内容",
    potential: true,
    PC: (x) => -0.2 * x,
    AV: (x) => -0.3 * x,
  },
  {
    content: "你经常愿意牺牲可读性来优化性能",
    PC: (x) => -0.2 * x,
    AV: (x) => -0.01 * x,
  },
  {
    content: "当你不知怎么起变量名时，你会随便想一个大概差不多的",
    RQ: (x) => -0.15 * x,
  },
  {
    content: "你经常会保证项目的功能稳定性，出于风险角度，有些地方暂不考虑优化",
    PC: (x) => 0.33 * x,
  },
  {
    content: "你认为注释写得太详细会浪费时间，良好的代码是“自文档”的",
    RQ: (x) => -0.05 * (x - 1.5),
  },
  {
    content: "如果你写的代码有超级AI能准确无误的补全你的注释，你会很高兴",
    RQ: (x) => {
      if (x > 0) {
        return -0.01;
      }
    },
  },
  {
    content:
      "多数时候，相比新框架，你更愿意使用自己熟练掌握的方式和技术来做项目",
    FE: (x) => -0.22 * x,
  },
  {
    content: "你花了很多时间学习了很多不同的语言和框架，并且有人认为你会的很多",
    FE: (x) => 0.33 * x,
  },
  {
    content: "你打算专精于一个领域，将来想成为一个专家",
    potential: true,
    FE: (x) => -0.33 * x,
  },
  {
    content:
      "你认为写出不同的前端界面、样式和UI交互很有趣（如果你还没学过和尝试过，请选择中立）",
    AV: (x) => 0.33 * x,
  },
  {
    content: "当你写的程序能可视化，甚至能用鼠标等设备进行交互时，你会很高兴。",
    potential: true,
    AV: (x) => 0.15 * x,
    FE: (x) => 0.15 * x,
  },
  {
    content: "设计并做出一个庞大复杂的系统对你来说并不困难。",
    AV: (x) => -0.33 * x,
    PC: (x) => -0.1 * x,
  },
  {
    content: "你没有开发游戏的打算",
    potential: true,
    AV: (x) => -0.1 * (x - 0.5),
  },
  {
    content: "你希望未来能设计一个让自己有成就感的大后端系统",
    potential: true,
    AV: (x) => -0.33 * x,
    FE: (x) => -0.33 * x,
  },
];

const PERSONALITY = {
  AFRP: { name: "算法工程师", describe: "" },
  AFRC: { name: "后端工程师", describe: "" },
  AFQP: { name: "数据分析师", describe: "" },
  AFQC: { name: "后端架构师", describe: "" },
  AERP: { name: "算法竞赛人", describe: "" },
  AERC: { name: "数据挖掘师", describe: "" },
  AEQP: { name: "系统优化师", describe: "" },
  AEQC: { name: "后端开发者", describe: "" },
  VFRP: { name: "游戏开发者", describe: "" },
  VFRC: { name: "前端CI/CD专家", describe: "" },
  VFQP: { name: "游戏优化师", describe: "" },
  VFQC: { name: "前端架构师", describe: "" },
  VERP: { name: "全栈工程师", describe: "" },
  VERC: { name: "前端工程师", describe: "" },
  VEQP: { name: "可视化工程师", describe: "" },
  VEQC: { name: "前端开拓者", describe: "" },
};
