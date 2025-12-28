"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tests/checker.test.ts
const checkCredits_1 = require("../src/logic/checkCredits");
const types_1 = require("../src/logic/types");
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
describe("GraduationChecker 強化テスト (OOP版)", () => {
    test("複数科目・複数要件 - 片方だけ満たす場合", () => {
        const reqs = [new types_1.Requirement("共通教育", 10), new types_1.Requirement("専門", 15)];
        const courses = [new types_1.Course("数学", "共通教育", 10), new types_1.Course("物理", "専門", 5)];
        const testRunner = new CheckerTest(reqs, courses);
        const results = testRunner.run();
        expect(results.find(r => r.category === "共通教育")?.passed).toBe(true);
        expect(results.find(r => r.category === "専門")?.passed).toBe(false);
    });
    test("境界値テスト - 1単位足りないと不合格", () => {
        const reqs = [new types_1.Requirement("専門", 10)];
        const courses = [new types_1.Course("物理", "専門", 9)];
        const testRunner = new CheckerTest(reqs, courses);
        const results = testRunner.run();
        expect(results[0].passed).toBe(false);
    });
    test("複数科目で合算して要件達成", () => {
        const reqs = [new types_1.Requirement("専門", 10)];
        const courses = [new types_1.Course("物理", "専門", 4), new types_1.Course("化学", "専門", 6)];
        const testRunner = new CheckerTest(reqs, courses);
        const results = testRunner.run();
        expect(results[0].passed).toBe(true);
    });
});
