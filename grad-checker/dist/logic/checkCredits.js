export class GraduationChecker {
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
    report() {
        const result = {};
        for (const req of this.requirements) {
            result[req.category] = req.earnedCredits;
        }
        return result;
    }
}
