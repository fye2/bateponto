"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersRepository_1 = require("../repositories/UsersRepository");
function guildMemberRemove(client) {
    client.on('guildMemberRemove', (member) => __awaiter(this, void 0, void 0, function* () {
        const user = UsersRepository_1.usersRepository.get(member.id);
        if (!user)
            return;
        UsersRepository_1.usersRepository.remove(member.id);
    }));
}
exports.default = guildMemberRemove;
//# sourceMappingURL=guildMemberRemove.js.map