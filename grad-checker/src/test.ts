import { Requirement, Course } from "./logic/types.js";
import { GraduationChecker } from "./logic/checkCredits.js";

// 卒業要件のオブジェクト作成
const requirements = [
  new Requirement("共通教育", 30),
  new Requirement("専門", 50)
];

// 履修科目のオブジェクト作成
const courses = [
  new Course("数学A", "共通教育", 2),
  new Course("物理B", "専門", 4),
  new Course("化学C", "専門", 3)
];

// チェッカーを作成して計算
const checker = new GraduationChecker(requirements, courses);
checker.calculate();

// 結果を取得して出力
const results = checker.report();
console.log("取得単位:", results);

// 満たしているかどうかも確認
console.log("卒業要件状況:");
requirements.forEach(r => {
  console.log(`${r.category}: ${r.earnedCredits} / ${r.requiredCredits} 単位 ${r.isSatisfied() ? "✅" : "❌"}`);
});
