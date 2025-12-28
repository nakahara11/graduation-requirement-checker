"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tests/checkerOOP2.test.ts
const checkCredits_1 = require("../src/logic/checkCredits");
const types_1 = require("../src/logic/types");
// GraduationChecker をラップする OOP クラス
class CheckerTest {
    constructor(reqs, courses) {
        this.reqs = reqs;
        this.courses = courses;
        this.checker = new checkCredits_1.GraduationChecker(this.reqs, this.courses);
    }
    run() {
        this.checker.calculate();
        return this.checker.getResults();
    }
    getFirstResult() {
        return this.run()[0];
    }
}
// Jest テスト
test("専門が足りない場合は不合格になる (OOP版)", () => {
    const requirements = [new types_1.Requirement("専門", 50)];
    const courses = [new types_1.Course("データ構造", "専門", 10)];
    const testRunner = new CheckerTest(requirements, courses);
    const result = testRunner.getFirstResult();
    expect(result.passed).toBe(false);
});
test("必要単位を満たしていれば合格 (OOP版)", () => {
    const requirements = [new types_1.Requirement("共通教育", 10)];
    const courses = [new types_1.Course("英語", "共通教育", 10)];
    const testRunner = new CheckerTest(requirements, courses);
    const result = testRunner.getFirstResult();
    expect(result.passed).toBe(true);
});
