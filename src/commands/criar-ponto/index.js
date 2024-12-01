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
const configs = __importStar(require("../../config.json"));
const responseEmbeds_1 = require("../../structures/responseEmbeds");
const builder = () => new discord_js_1.SlashCommandBuilder()
    .setName("painel-bateponto")
    .setDescription("crie a mensagem principal onde os membros poderão abrir e fechar o ponto")
    .toJSON();
exports.builder = builder;
const executer = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (interaction.commandName !== (0, exports.builder)().name)
        return;
    const guild = interaction.guild;
    if (!guild)
        return;
    const adminRolesId = configs.pointAdminRolesId;
    const memberAuthor = guild.members.cache.get(interaction.user.id);
    if (!memberAuthor)
        return;
    if (!memberAuthor.roles.cache.some(role => adminRolesId.includes(role.id))) {
        interaction.reply({
            embeds: [(0, responseEmbeds_1.noPermissionCommand)(interaction.guild)],
            ephemeral: true
        });
        return;
    }
    interaction.reply({
        embeds: [(0, responseEmbeds_1.pointWasCreated)(interaction.guild)],
        ephemeral: true
    });
    const mainEmbed = new discord_js_1.EmbedBuilder()
        .setAuthor({ name: `💻 Sistema de Bate Ponto - ${guild.name}` })
        .setColor(0x2f3136)
        .setImage('https://media.discordapp.net/attachments/1105203335860068383/1111345876867235880/registrobots_1.png')
        .setDescription(`<:grAnalisedaanaliseBCG:1105614064740212787> Esse servidor possui sistema de \`BATE PONTO SEMI - AUTOMATICO\`. Uma maneira fácil, prática e rápida de registrar pontos.

        <:sino:1105613659448807434> **Como Funciona**


        >   <:info:1111352032423587900> Para abrir um ponto você precisa entrar em uma das calls da categoria \`F.T - Patrulhamento\` e __clique no botão__ **ABRIR**
        
        >   <:Escudo_Staff:1110630077319884930> Após estar com ponto aberto e não quiser mas fazer ações você pode fechar seu ponto, clicando no botão __FECHAR__.
        
        >   <:icon:1111352400024961054> Você pode também consultar o total de horas obtidas em todos os pontos da semana, clicando no botão __HORAS__

        <:aviso:1111349490935414884> Caso sua internet cair ou esquecer de fechar e sair da call, não se preocupe seu ponto será fechado automaticamente.`);
        
    const mainRow = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
        .setLabel('Abrir')
        .setStyle(discord_js_1.ButtonStyle.Success)
        .setCustomId('open-point-button')
        .setEmoji('certo2:1109209422875611246>'), new discord_js_1.ButtonBuilder()
        .setLabel('Fechar')
        .setStyle(discord_js_1.ButtonStyle.Danger)
        .setCustomId('close-point-button')
        .setEmoji('<:errado:1109209432866426961>'), new discord_js_1.ButtonBuilder()
        .setLabel('Ver horas')
        .setStyle(discord_js_1.ButtonStyle.Secondary)
        .setCustomId('show-hours-point-button')
        .setEmoji('<:rave4:1053104159907381289>'));
    if (((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.type) !== discord_js_1.ChannelType.GuildText)
        return;
    interaction.channel.send({
        embeds: [mainEmbed],
        components: [mainRow]
    });
});
exports.executer = executer;
//# sourceMappingURL=index.js.map