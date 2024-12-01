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
const collectOneOfButton_1 = require("../../collectors/collectOneOfButton");
const UsersRepository_1 = require("../../repositories/UsersRepository");
const formatMilliseconds_1 = require("../../structures/formatMilliseconds");
const builder = () => new discord_js_1.SlashCommandBuilder()
    .setName("ranking")
    .setDescription("veja o ranking de horas de todos os membros do servidor")
    .toJSON();
exports.builder = builder;
const executer = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (interaction.commandName !== (0, exports.builder)().name)
        return;
    const guild = interaction.guild;
    const allUsers = UsersRepository_1.usersRepository.fetchAll();
    if (allUsers.length === 0) {
        interaction.reply({
            content: '❌ O banco de dados está vázio, por isso não vou conseguir mostrar o ranking',
            ephemeral: true
        });
        return;
    }
    function userRankToString(user, index) {
        var _a;
        const member = guild.members.cache.get(user.id);
        const displayName = member ? member.displayName : "Unknown";
        return `**${index + 1}.** **${displayName}** • ${(0, formatMilliseconds_1.formatMilliseconds)(user.pointHours)}`;
    }
    const allSortedUsers = allUsers
        .sort((a, b) => b.pointHours - a.pointHours)
        .map(userRankToString);
    if (!guild)
        return;
    const allUsersInPages = arrayToPages(allSortedUsers, 10);
    let index = 0;
    const paginationActionRow = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
        .setLabel('Anterior')
        .setStyle(discord_js_1.ButtonStyle.Secondary)
        .setCustomId('page-previous-button'), new discord_js_1.ButtonBuilder()
        .setLabel('Próxima')
        .setStyle(discord_js_1.ButtonStyle.Secondary)
        .setCustomId('page-next-button'));
    const makeMessageData = (page) => {
        const pageEmbed = new discord_js_1.EmbedBuilder()
            .setDescription(allUsersInPages[page].join('\n'))
            .setAuthor({ name: `🏆・Ranking - ${guild.name}` })
            .setColor(0x2b2d31)
            .setFooter({
            text: `Página ${page + 1}/${allUsersInPages.length}`
        });
        const previousButton = paginationActionRow.components[0];
        const nextButton = paginationActionRow.components[1];
        if (page === 0) {
            previousButton.setDisabled(true);
        }
        else {
            previousButton.setDisabled(false);
        }
        if ((page + 1) === allUsersInPages.length) {
            nextButton.setDisabled(true);
        }
        else {
            nextButton.setDisabled(false);
        }
        return { embeds: [pageEmbed], components: [paginationActionRow] };
    };
    const message = yield interaction.reply(Object.assign(Object.assign({}, makeMessageData(index)), { fetchReply: true }));
    yield managePagination();
    function managePagination() {
        return __awaiter(this, void 0, void 0, function* () {
            const { buttonInteraction } = yield (0, collectOneOfButton_1.collectOneOfButton)({
                message: message,
                user: interaction.user,
                customIds: [
                    'page-previous-button',
                    'page-next-button'
                ]
            });
            if (!buttonInteraction)
                return;
            if (buttonInteraction.customId === 'page-next-button') {
                index = index + 1;
                yield buttonInteraction.update(makeMessageData(index));
            }
            if (buttonInteraction.customId === 'page-previous-button') {
                index = index - 1;
                yield buttonInteraction.update(makeMessageData(index));
            }
            yield managePagination();
        });
    }
});
exports.executer = executer;
function arrayToPages(array, itemsPerPage) {
    return array.reduce((pages, item, index) => {
        if (index === 0)
            return [[item]];
        else if (index % itemsPerPage === 0)
            return [...pages, [item]];
        const lastPage = pages.pop();
        return [...pages, [...lastPage, item]];
    }, []);
}
//# sourceMappingURL=index.js.map