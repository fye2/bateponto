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
const discord_js_1 = require("discord.js");
const UsersRepository_1 = require("../repositories/UsersRepository");
const responseEmbeds_1 = require("../structures/responseEmbeds");
const configs = __importStar(require("../config.json"));
function openPointButtonClicked(client) {
    client.on('openPointButtonClicked', (interaction, user) => __awaiter(this, void 0, void 0, function* () {
        if (!interaction.guild)
            return;
        if (!interaction.member)
            return;
        const member = interaction.member;
        const logChannel = interaction.guild.channels.cache.get(configs.pointLogChannel);
        if (!logChannel)
            return console.warn('O canal de logs não foi encontrado, verifique se configurou ou ele existe.');
        if (logChannel.type !== discord_js_1.ChannelType.GuildText)
            return console.warn('O canal de log que você configurou não é canal de texto.');
        if (!member.voice.channel || !configs.pointVoiceChannelsId.includes(member.voice.channel.id)) {

            interaction.reply({
                embeds: [(0, responseEmbeds_1.noVoiceChannel)(interaction.guild)],
                ephemeral: true
            });
            return;
        }
        if (user === null || user === void 0 ? void 0 : user.startedWorkAt) {
            const errorEmbed = (0, responseEmbeds_1.alreadyHaveOpenPoint)(interaction.guild);
            interaction.reply({
                embeds: [errorEmbed],
                ephemeral: true
            });
            return;
        }
        UsersRepository_1.usersRepository.update(interaction.user.id, (user) => user.startedWorkAt = new Date());
        const mainEmbed = (0, responseEmbeds_1.pointWasOpened)(interaction.guild, member);
        const logMessage = yield logChannel.send({
            content: member.toString(),
            embeds: [mainEmbed]
        });
        const interactionResponse = (0, responseEmbeds_1.pointOpenedResponse)(interaction.guild, logMessage);
        interaction.reply({
            embeds: [interactionResponse],
            ephemeral: true
        });
    }));
}
exports.default = openPointButtonClicked;
//# sourceMappingURL=openPointButtonClicked.js.map