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
exports.executer = exports.builder = void 0;
const discord_js_1 = require("discord.js");
const UsersRepository_1 = require("../../repositories/UsersRepository");
const formatMilliseconds_1 = require("../../structures/formatMilliseconds");
const User_1 = require("../../structures/User");
const builder = () => new discord_js_1.SlashCommandBuilder()
    .setName("ver-horas")
    .setDescription("Veja as horas de outros usuários dentro do servidor")
    .addUserOption(option => {
    option.setName('usuário');
    option.setDescription('usuário que você deseja ver as horas');
    option.setRequired(true);
    return option;
})
    .toJSON();
exports.builder = builder;
const executer = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (interaction.commandName !== (0, exports.builder)().name)
        return;
    const guild = interaction.guild;
    const userMentioned = interaction.options.getUser('usuário');
    if (!userMentioned)
        return;
    if (!guild)
        return;
    const createUser = () => __awaiter(void 0, void 0, void 0, function* () {
        const user = User_1.User.create({
            id: userMentioned.id,
            pointHours: 0,
            startedWorkAt: null
        });
        yield UsersRepository_1.usersRepository.add(user);
        return user;
    });
    const user = UsersRepository_1.usersRepository.get(userMentioned.id) || (yield createUser());
    interaction.reply({
        content: `${(_a = interaction.member) === null || _a === void 0 ? void 0 : _a.toString()} **${userMentioned.tag}** tem **${(0, formatMilliseconds_1.formatMilliseconds)(user.pointHours)}** no total de seu tempo de ponto.`,
    });
});
exports.executer = executer;
//# sourceMappingURL=index.js.map