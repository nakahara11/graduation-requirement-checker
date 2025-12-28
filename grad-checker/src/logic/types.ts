// Requirement.ts
// types.ts
export class Requirement {
  category: string;          // 分野名
  requiredCredits: number;   // 必要単位数
  earnedCredits: number = 0; // 取得済み単位数

  constructor(category: string, requiredCredits: number) {
    this.category = category;
    this.requiredCredits = requiredCredits;
  }

  addCredits(credits: number) {
    this.earnedCredits += credits;
  }

  isSatisfied(): boolean {
    return this.earnedCredits >= this.requiredCredits;
  }
}

export class Course {
  name: string;
  category: string;
  credits: number;

  constructor(name: string, category: string, credits: number) {
    this.name = name;
    this.category = category;
    this.credits = credits;
  }
}

export type GraduationResult = {
  category: string;   // 分野名
  earned: number;     // 取得済み単位数
  required: number;   // 必要単位数
  passed: boolean;    // 判定結果
};
export class GraduationChecker {
  requirements: Requirement[];
  courses: Course[];

  constructor(requirements: Requirement[], courses: Course[]) {
    this.requirements = requirements;
    this.courses = courses;
  }

  calculate(): void {
    for (const course of this.courses) {
      const req = this.requirements.find(r => r.category === course.category);
      if (req) req.addCredits(course.credits);
    }
  }

  getResults(): GraduationResult[] {
    return this.requirements.map(req => ({
      category: req.category,
      earned: req.earnedCredits,
      required: req.requiredCredits,
      passed: req.isSatisfied(),
    }));
  }

  // 未達成項目だけ表示
  printIncomplete(): void {
    const incomplete = this.getResults().filter(r => !r.passed);
    console.log("=== 未達成項目 ===");
    for (const r of incomplete) {
      console.log(`${r.category}: ${r.earned}/${r.required}`);
    }
  }

  // JSON 出力
  toJSON(): GraduationResult[] {
    return this.getResults();
  }
}

// src/types.ts

export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };
