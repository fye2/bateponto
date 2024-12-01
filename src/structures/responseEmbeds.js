"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberLeftVoiceChannel = exports.pointOpenedResponse = exports.pointClosedResponse = exports.noVoiceChannel = exports.pointWasCreated = exports.noPermissionCommand = exports.totalHours = exports.pointWasClosed = exports.notHaveOpenPoint = exports.pointWasOpened = exports.alreadyHaveOpenPoint = void 0;
const discord_js_1 = require("discord.js");
const formatMilliseconds_1 = require("./formatMilliseconds");
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('pt-br');
const alreadyHaveOpenPoint = (guild) => new discord_js_1.EmbedBuilder()
    .setAuthor({ name: `BATE-PONTO - ${guild.name}` })
    .setColor(0xec373b)
    .setDescription(`❌ Você já está com um ponto aberto. Feche-o primeiro para que possa abrir outro novamente.`);
exports.alreadyHaveOpenPoint = alreadyHaveOpenPoint;
const pointWasOpened = (guild, member) => new discord_js_1.EmbedBuilder()
    .setAuthor({ name:`BATE PONTO - ${guild.name}` })
    .setColor(0x6ce460)
    .setThumbnail(`https://cdn.discordapp.com/attachments/1130580505876779079/1131444313495187527/17fd5a8eaa6a59432d708a080e963943.png`)
    .setImage(`https://media.discordapp.net/attachments/1130580505876779079/1130924056695279707/35.png?width=1020&height=255`)
    .setDescription(`\`👤\` **MEMBRO:** ${member}\n\`🟢\` **INÍCIO:** ${(0, moment_1.default)().format("DD/MM/YYYY")}\n\`🟢\` **ID:** ${member.id}\n\`🟢\` **PONTO:** ~~ABERTO~~`)
    .setFooter({
    iconURL: member.displayAvatarURL({ forceStatic: false }),
    text: (0, moment_1.default)().format('LLLL')
});
exports.pointWasOpened = pointWasOpened;
const notHaveOpenPoint = (guild) => new discord_js_1.EmbedBuilder()
    .setAuthor({ name: `BATE-PONTO - ${guild.name}` })
    .setColor(0xec373b)
    .setDescription(`❌ Você não está com um ponto aberto. Abra um primeiro para que possa fechar.`);
exports.notHaveOpenPoint = notHaveOpenPoint;
const pointWasClosed = (guild, member, timeWorked) => new discord_js_1.EmbedBuilder()
    .setAuthor({ name:`BATE PONTO - ${guild.name}` })
    .setColor('Red')
    .setThumbnail(`https://cdn.discordapp.com/attachments/1130580505876779079/1131444313495187527/17fd5a8eaa6a59432d708a080e963943.png`)
    .setImage(`https://media.discordapp.net/attachments/1130580505876779079/1130924056695279707/35.png?width=1020&height=255`)
    .setDescription(`\`👤\` **MEMBRO:** ${member}\n\`\🔴\` **TÉRMINO:** ${(0, moment_1.default)().format("DD/MM/YYYY")}\n\`\🔴\` **ID:** ${member.id}\n\`🔴\` **PONTO:** ~~FECHADO~~\n\`⏰\` **TOTAL:** ${(0, formatMilliseconds_1.formatMilliseconds)(timeWorked)}`)
    .setFooter({
    iconURL: member.displayAvatarURL({ forceStatic: false }),
    text: (0, moment_1.default)().format('LLLL')
});
exports.pointWasClosed = pointWasClosed;
const totalHours = (guild, timeWorked) => new discord_js_1.EmbedBuilder()
    .setAuthor({ name: `BATE-PONTO - ${guild.name}` })
    .setColor(0x2b2d31)
    .setDescription(`⏰ Você tem ${(0, formatMilliseconds_1.formatMilliseconds)(timeWorked)} no seu tempo total de ponto.`);
exports.totalHours = totalHours;
const noPermissionCommand = (guild) => new discord_js_1.EmbedBuilder()
    .setAuthor({ name: `BATE-PONTO - ${guild.name}` })
    .setColor(0xec373b)
    .setDescription(`❌ Você não tem permissões suficientes para usar esse comando.`);
exports.noPermissionCommand = noPermissionCommand;
const pointWasCreated = (guild) => new discord_js_1.EmbedBuilder()
    .setAuthor({ name: `BATE-PONTO - ${guild.name}` })
    .setColor(0x6ce460)
    .setDescription(`✅ A mensagem principal do ponto foi criada com sucesso.`);
exports.pointWasCreated = pointWasCreated;
const noVoiceChannel = (guild) => new discord_js_1.EmbedBuilder()
    .setAuthor({ name: `BATE-PONTO - ${guild.name}` })
    .setColor(0xec373b)
    .setDescription(`❌ Para utilizar esse botão você precisa estar em um canal de voz do BATE-PONTO`);
exports.noVoiceChannel = noVoiceChannel;
const pointOpenedResponse = (guild, message) => new discord_js_1.EmbedBuilder()
    .setAuthor({ name: `BATE-PONTO - ${guild.name}` })
    .setColor(0x6ce460)
    .setDescription(`✅ Seu ponto foi aberto com sucesso. [Clique aqui](${message.url}) para ir para a mensagem dos logs.`);
exports.pointOpenedResponse = pointOpenedResponse;
const pointClosedResponse = (guild, message) => new discord_js_1.EmbedBuilder()
    .setAuthor({ name: `BATE-PONTO - ${guild.name}` })
    .setColor(0x6ce460)
    .setDescription(`✅ Seu ponto foi fechado com sucesso. [Clique aqui](${message.url}) para ir para a mensagem dos logs.`);
exports.pointClosedResponse = pointClosedResponse;
const memberLeftVoiceChannel = (guild, member, timeWorked) => new discord_js_1.EmbedBuilder()
    .setAuthor({ name: `BATE-PONTO - ${guild.name}` })
    .setColor(0x6ce460)
    .setDescription(`👤 **MEMBRO:** ${member}\n\🔒 **AVISO** Esse ponto foi fechado por conta que o mesmo saiu da call e não retornou mais.`)
    .setFooter({
    iconURL: member.displayAvatarURL({ forceStatic: false }),
    text: (0, moment_1.default)().format('LLLL')
});
exports.memberLeftVoiceChannel = memberLeftVoiceChannel;
//# sourceMappingURL=responseEmbeds.js.map