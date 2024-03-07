"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./auth.route"));
const routes = async (fastify) => {
    //* Registred auth routes
    //* Accessible through : http://localhost:3000/auth
    fastify.register(auth_route_1.default, { prefix: "/auth" });
};
exports.default = routes;
