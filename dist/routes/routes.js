"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_route_1 = __importDefault(require("./category.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
//* Authentication Routes
const routes = async (fastify) => {
    //* Registred auth routes
    //* Accessible through : http://localhost:3000/auth
    fastify.register(auth_route_1.default, { prefix: "/auth" });
    //* Registred category routes
    //* Accessible through : http://localhost:3000/category
    fastify.register(category_route_1.default, { prefix: "/category" });
};
exports.default = routes;
