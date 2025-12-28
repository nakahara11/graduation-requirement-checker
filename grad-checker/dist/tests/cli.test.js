"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tests/cliRunner.test.ts
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
class CLITestRunner {
    constructor(cliPath, dataPath, mode = "text") {
        this.cliPath = cliPath;
        this.dataPath = dataPath;
        this.mode = mode;
    }
    run() {
        try {
            const output = (0, child_process_1.execSync)(`npx ts-node ${this.cliPath} ${this.dataPath} --${this.mode}`, {
                stdio: ["pipe", "pipe", "pipe"],
            }).toString();
            return { output };
        }
        catch (e) {
            // stderr があればそちらを優先
            const error = (e.stderr?.toString() || e.message).trim();
            return { error };
        }
    }
}
// -----------------------------
// Paths
// -----------------------------
const CLI_PATH = path_1.default.resolve(__dirname, "../src/test.ts");
const DATA_PATH_VALID = path_1.default.resolve(__dirname, "./valid.json");
const DATA_PATH_INVALID = path_1.default.resolve(__dirname, "./invalid.json");
// -----------------------------
// Jest テスト
// -----------------------------
describe("CLI 実行テスト (OOP版)", () => {
    test("--text で未達成項目が表示される", () => {
        const runner = new CLITestRunner(CLI_PATH, DATA_PATH_VALID, "text");
        const { output } = runner.run();
        expect(output).toMatch(/=== 未達成項目 ===/);
        expect(output).toMatch(/共通教育:/);
        expect(output).toMatch(/専門:/);
    });
    test("--json で JSON 配列が出力される", () => {
        const runner = new CLITestRunner(CLI_PATH, DATA_PATH_VALID, "json");
        const { output } = runner.run();
        const json = JSON.parse(output);
        expect(Array.isArray(json)).toBe(true);
        expect(json[0]).toHaveProperty("category");
        expect(json[0]).toHaveProperty("earned");
        expect(json[0]).toHaveProperty("required");
        expect(json[0]).toHaveProperty("passed");
    });
    test("invalid.json でエラーが出る (--json)", () => {
        const runner = new CLITestRunner(CLI_PATH, DATA_PATH_INVALID, "json");
        const { error } = runner.run();
        expect(error).toMatch(/要素が不正/);
    });
    test("invalid.json でエラーが出る (--text)", () => {
        const runner = new CLITestRunner(CLI_PATH, DATA_PATH_INVALID, "text");
        const { error } = runner.run();
        expect(error).toMatch(/要素が不正/);
    });
});
