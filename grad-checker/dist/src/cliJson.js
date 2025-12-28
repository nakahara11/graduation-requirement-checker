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
Object.defineProperty(exports, "__esModule", { value: true });
// src/cliJson.ts
const fs = __importStar(require("fs"));
const checkCredits_1 = require("./logic/checkCredits");
const types_1 = require("./logic/types");
// コマンドライン引数取得
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("使い方: node dist/cliJson.js <data.json>");
    process.exit(1);
}
const filePath = args[0];
// ファイル存在チェック
if (!fs.existsSync(filePath)) {
    console.error(`ファイルが存在しません: ${filePath}`);
    process.exit(1);
}
// JSON 読み込み
const raw = fs.readFileSync(filePath, "utf-8");
const data = JSON.parse(raw);
// Requirement と Course インスタンス作成
const requirements = data.requirements.map((r) => new types_1.Requirement(r.category, r.required));
const courses = data.courses.map((c) => new types_1.Course(c.name, c.category, c.credits));
// 卒業チェック
const checker = new checkCredits_1.GraduationChecker(requirements, courses);
checker.calculate();
// JSON 出力
console.log(JSON.stringify(checker.getResults(), null, 2));
