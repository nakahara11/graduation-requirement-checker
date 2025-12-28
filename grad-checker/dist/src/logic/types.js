"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraduationChecker = exports.Course = exports.Requirement = void 0;
// Requirement.ts
// types.ts
class Requirement {
    constructor(category, requiredCredits) {
        this.earnedCredits = 0; // 取得済み単位数
        this.category = category;
        this.requiredCredits = requiredCredits;
    }
    addCredits(credits) {
        this.earnedCredits += credits;
    }
    isSatisfied() {
        return this.earnedCredits >= this.requiredCredits;
    }
}
exports.Requirement = Requirement;
class Course {
    constructor(name, category, credits) {
        this.name = name;
        this.category = category;
        this.credits = credits;
    }
}
exports.Course = Course;
class GraduationChecker {
    constructor(requirements, courses) {
        this.requirements = requirements;
        this.courses = courses;
    }
    calculate() {
        for (const course of this.courses) {
            const req = this.requirements.find(r => r.category === course.category);
            if (req)
                req.addCredits(course.credits);
        }
    }
    getResults() {
        return this.requirements.map(req => ({
            category: req.category,
            earned: req.earnedCredits,
            required: req.requiredCredits,
            passed: req.isSatisfied(),
        }));
    }
    // 未達成項目だけ表示
    printIncomplete() {
        const incomplete = this.getResults().filter(r => !r.passed);
        console.log("=== 未達成項目 ===");
        for (const r of incomplete) {
            console.log(`${r.category}: ${r.earned}/${r.required}`);
        }
    }
    // JSON 出力
    toJSON() {
        return this.getResults();
    }
}
exports.GraduationChecker = GraduationChecker;
