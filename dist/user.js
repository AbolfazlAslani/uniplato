"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// user.ts
class User {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    static findUser(id) {
        return new Promise((resolve, reject) => {
            // User Service REST API call to fetch User with a specific id.
            // ...
        });
    }
}
exports.User = User;
