"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.IntentsBitField.Flags.Guilds,
        discord_js_1.IntentsBitField.Flags.GuildInvites,
        discord_js_1.IntentsBitField.Flags.GuildMembers,
        discord_js_1.IntentsBitField.Flags.GuildMessages,
        discord_js_1.IntentsBitField.Flags.MessageContent,
        discord_js_1.IntentsBitField.Flags.GuildVoiceStates
    ],
    allowedMentions: {
        parse: ['users']
    },
    partials: [
        discord_js_1.Partials.Message,
    ]
});
exports.client = client;
client.once('ready', (readyClient) => {
    const invite = readyClient.generateInvite({
        permissions: [discord_js_1.PermissionsBitField.Flags.UseApplicationCommands, discord_js_1.PermissionsBitField.Flags.Administrator],
        scopes: [discord_js_1.OAuth2Scopes.Bot, discord_js_1.OAuth2Scopes.ApplicationsCommands]
    });
    console.log(invite);
});
//# sourceMappingURL=Client.js.map