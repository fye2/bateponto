"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseEmbeds_1 = require("../structures/responseEmbeds");
function showHoursButtonClicked(client) {
    client.on('showHoursButtonClicked', (interaction, user) => {
        if (!interaction.guild)
            return;
        const userTimeWorked = (user === null || user === void 0 ? void 0 : user.pointHours) || 0;
        const mainEmbed = (0, responseEmbeds_1.totalHours)(interaction.guild, userTimeWorked);
        interaction.reply({
            embeds: [mainEmbed],
            ephemeral: true
        });
    });
}
exports.default = showHoursButtonClicked;
//# sourceMappingURL=showHoursButtonClicked.js.map