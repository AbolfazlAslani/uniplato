"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_route_1 = __importDefault(require("./category.route"));
const routes = async (fastify) => {
    //* Registred auth routes
    //* Accessible through : http://localhost:3000/category
    fastify.register(category_route_1.default, { prefix: "/category" });
};
exports.default = routes;
