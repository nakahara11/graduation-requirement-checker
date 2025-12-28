"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tests/checkerSimple.test.ts
const checkCredits_1 = require("../src/logic/checkCredits");
const types_1 = require("../src/logic/types");
// GraduationChecker をラップするクラス
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
}
// Jest テスト
test("卒業要件を満たさない場合 false (OOP版)", () => {
    const reqs = [new types_1.Requirement("専門", 10)];
    const courses = [new types_1.Course("数学", "専門", 4)];
    const testRunner = new CheckerTest(reqs, courses);
    const result = testRunner.run();
    expect(result[0].passed).toBe(false);
});
