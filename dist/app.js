"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = __importDefault(require("./routes/routes"));
const server = (0, fastify_1.default)();
//* All Routes 
server.register(routes_1.default);
const port = 3000;
server.listen({ port }, (err) => {
    try {
        console.log(`Server running on http://localhost:${port}`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
});
exports.default = server;
