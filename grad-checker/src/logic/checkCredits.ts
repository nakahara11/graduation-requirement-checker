import { Requirement, Course } from "./types.js";

export class GraduationChecker {
  requirements: Requirement[];
  courses: Course[];

  constructor(requirements: Requirement[], courses: Course[]) {
    this.requirements = requirements;
    this.courses = courses;
  }

  calculate() {
    for (const course of this.courses) {
      const req = this.requirements.find(r => r.category === course.category);
      if (req) req.addCredits(course.credits);
    }
  }

  report(): Record<string, number> {
    const result: Record<string, number> = {};
    for (const req of this.requirements) {
      result[req.category] = req.earnedCredits;
    }
    return result;
  }
}
