"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// auth.route.ts
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
//* Authentication Routes
const routes = async (fastify) => {
    fastify.post('/signup', {
        schema: user_schema_1.default.schema,
        handler: auth_controller_1.default.signUp,
    });
};
exports.default = routes;
