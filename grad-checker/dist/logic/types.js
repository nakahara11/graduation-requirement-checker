// Requirement.ts
// types.ts
export class Requirement {
    constructor(category, requiredCredits) {
        this.earnedCredits = 0;
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
export class Course {
    constructor(name, category, credits) {
        this.name = name;
        this.category = category;
        this.credits = credits;
    }
}
