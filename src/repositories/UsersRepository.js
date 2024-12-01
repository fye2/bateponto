"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRepository = exports.UsersRepository = void 0;
const database_1 = require("../database");
class UsersRepository {
    constructor() {
        this.users = database_1.db.createCollection('users');
    }
    fetchAll() {
        const allUsers = this.users.fetchAll();
        return allUsers;
    }
    add(user) {
        const databaseUser = this.get(user.id);
        if (!databaseUser)
            this.users.create(user.toJSON());
    }
    get(id) {
        const user = this.users.fetch((user) => user.id === id);
        if (!user)
            return null;
        return Array.isArray(user) ? user[0] : user;
    }
    update(id, callback) {
        const user = this.users.fetch((user) => user.id === id);
        if (!user)
            return null;
        this.users.update(callback, user => user.id === id);
    }
    remove(id) {
        const user = this.users.fetch((user) => user.id === id);
        if (!user)
            return null;
        return this.users.remove(user => user.id === id);
    }
    deleteAll() {
        return this.users.update(users => users.pointHours = 0);
    }
}
exports.UsersRepository = UsersRepository;
exports.usersRepository = new UsersRepository();
//# sourceMappingURL=UsersRepository.js.map