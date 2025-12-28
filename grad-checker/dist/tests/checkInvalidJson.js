"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonValidator = void 0;
// tests/checkInvalidJsonOOP.ts
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
class JsonValidator {
    constructor(filePath) {
        this.filePath = filePath;
    }
    // -----------------------------
    // JSON 読み込み
    // -----------------------------
    loadJson() {
        if (!fs.existsSync(this.filePath)) {
            throw new Error(`ファイルが存在しません: ${this.filePath}`);
        }
        const raw = fs.readFileSync(this.filePath, "utf-8");
        try {
            return JSON.parse(raw);
        }
        catch (e) {
            throw new Error(`JSON ファイルの読み込みに失敗しました: ${e.message}`);
        }
    }
    // -----------------------------
    // 型チェック
    // -----------------------------
    validate(data) {
        if (!data.requirements || !Array.isArray(data.requirements)) {
            throw new Error("'requirements' 配列が存在しません");
        }
        if (!data.courses || !Array.isArray(data.courses)) {
            throw new Error("'courses' 配列が存在しません");
        }
        for (const r of data.requirements) {
            if (typeof r.category !== "string" || typeof r.required !== "number") {
                throw new Error("requirements の要素が不正です: " + JSON.stringify(r));
            }
        }
        for (const c of data.courses) {
            if (typeof c.name !== "string" || typeof c.category !== "string" || typeof c.credits !== "number") {
                throw new Error("courses の要素が不正です: " + JSON.stringify(c));
            }
        }
    }
    // -----------------------------
    // 実行
    // -----------------------------
    run() {
        const data = this.loadJson();
        this.validate(data);
        console.log("読み込み成功:", data);
    }
}
exports.JsonValidator = JsonValidator;
// -----------------------------
// CLI 実行
// -----------------------------
if (require.main === module) {
    const invalidFile = path_1.default.resolve(__dirname, "invalid.json");
    try {
        const validator = new JsonValidator(invalidFile);
        validator.run();
    }
    catch (e) {
        console.log("例外が出ました:", e.message);
    }
}
