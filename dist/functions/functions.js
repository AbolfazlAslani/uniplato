"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
//? This function hashes the password
const hashPassword = async (password) => {
    return bcrypt_1.default.hash(password, 10);
};
exports.default = hashPassword;
