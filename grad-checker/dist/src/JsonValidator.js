"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonValidator = void 0;
const fs_1 = __importDefault(require("fs"));
class JsonValidator {
    constructor(filePath) {
        this.filePath = filePath;
    }
    validate() {
        try {
            const raw = fs_1.default.readFileSync(this.filePath, "utf-8");
            const data = JSON.parse(raw);
            if (!Array.isArray(data.requirements)) {
                return { ok: false, error: "requirements が配列ではありません" };
            }
            if (!Array.isArray(data.courses)) {
                return { ok: false, error: "courses が配列ではありません" };
            }
            return {
                ok: true,
                value: data,
            };
        }
        catch (e) {
            return {
                ok: false,
                error: e.message ?? "JSON parse error",
            };
        }
    }
}
exports.JsonValidator = JsonValidator;
