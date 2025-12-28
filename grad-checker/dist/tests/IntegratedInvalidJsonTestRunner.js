"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegratedInvalidJsonTestRunner = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const JsonValidator_1 = require("../src/JsonValidator");
const types_1 = require("../src/logic/types");
class IntegratedInvalidJsonTestRunner {
    constructor(targetPath, cliPath) {
        this.targetPath = targetPath;
        this.cliPath = cliPath;
    }
    runAll() {
        const results = {};
        const files = this.collectJsonFiles(this.targetPath);
        for (const file of files) {
            const fullPath = path_1.default.resolve(this.targetPath, file);
            results[file] = {};
            /* ------------------------------
             * 1. JsonValidator チェック
             * ------------------------------ */
            const validation = new JsonValidator_1.JsonValidator(fullPath).validate();
            if (validation.ok === false) {
                results[file].validator = validation.error;
                continue;
            }
            results[file].validator = "NO ERROR (失敗)";
            /* ------------------------------
             * 2. Checker 相当処理
             * ------------------------------ */
            const reqs = validation.value.requirements.map(r => new types_1.Requirement(r.category, r.requiredCredits));
            const courses = validation.value.courses.map(c => new types_1.Course(c.name, c.category, c.credits));
            const resultsChecker = reqs.map(r => {
                const sum = courses
                    .filter(c => c.category === r.category)
                    .reduce((acc, c) => acc + c.credits, 0);
                r.addCredits(sum);
                return {
                    category: r.category,
                    earned: r.earnedCredits,
                    required: r.requiredCredits,
                    passed: r.isSatisfied(),
                };
            });
            if (resultsChecker.every(r => r.passed)) {
                results[file].checker = "NO ERROR (失敗)";
            }
            else {
                results[file].checker = "例外（未達成あり）";
            }
            /* ------------------------------
             * 3. CLI 実行チェック
             * ------------------------------ */
            try {
                (0, child_process_1.execSync)(`npx ts-node ${this.cliPath} ${fullPath}`, {
                    stdio: ["ignore", "pipe", "pipe"],
                });
                results[file].cli = "NO ERROR (失敗)";
            }
            catch (e) {
                results[file].cli = (e.stderr ?? e.message).toString();
            }
        }
        return results;
    }
    collectJsonFiles(target) {
        const stat = fs_1.default.statSync(target);
        if (stat.isFile()) {
            return [path_1.default.basename(target)];
        }
        if (stat.isDirectory()) {
            return fs_1.default
                .readdirSync(target)
                .filter(f => f.endsWith(".json"));
        }
        throw new Error("指定されたパスはファイルでもディレクトリでもありません");
    }
}
exports.IntegratedInvalidJsonTestRunner = IntegratedInvalidJsonTestRunner;
