"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const responseEmbeds_1 = require("../../structures/responseEmbeds");
const configs = __importStar(require("../../config.json"));
const builder = () => new discord_js_1.SlashCommandBuilder()
    .setName("resetar")
    .setDescription("use esse comando quando for resetar as horas de todos.")
    .toJSON();
exports.builder = builder;
const executer = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (interaction.commandName !== (0, exports.builder)().name)
        return;
    const guild = interaction.guild;
    if (!guild)
        return;
    const adminRolesId = configs.pointAdminRolesId;
    const member = guild.members.cache.get(interaction.user.id);
    if (!member)
        return;
    if (!member.roles.cache.some(role => adminRolesId.includes(role.id))) {
        interaction.reply({
            embeds: [(0, responseEmbeds_1.noPermissionCommand)(interaction.guild)],
            ephemeral: true
        });
        return;
    }
    UsersRepository_1.usersRepository.deleteAll();
    const logChannel = interaction.guild.channels.cache.get(configs.adminLogChannel);
    if (!logChannel)
        return console.warn('O canal de logs não foi encontrado, verifique se configurou ou ele existe.');
    if (logChannel.type !== discord_js_1.ChannelType.GuildText)
        return console.warn('O canal de log que você configurou não é canal de texto.');
    logChannel.send({
        content: `${interaction.member} resetou todas informações do banco de dados.`
    });
    interaction.reply({
        content: '✅ Você deletou todas informações do banco de dados com sucesso',
        ephemeral: true
    });
});
exports.executer = executer;
//# sourceMappingURL=index.js.map