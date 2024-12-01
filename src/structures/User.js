"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(data) {
        Object.assign(this, data);
    }
    toJSON() {
        return {
            id: this.id,
            pointHours: this.pointHours,
            startedWorkAt: this.startedWorkAt
        };
    }
    static create(data) {
        return new User(data);
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map