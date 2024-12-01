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
require("dotenv/config");
const Client_1 = require("./structures/Client");
const load_1 = require("./commands/utils/load");
const configs = __importStar(require("./config.json"));
const list_1 = require("./commands/utils/list");
const UsersRepository_1 = require("./repositories/UsersRepository");
const User_1 = require("./structures/User");
const events_1 = require("./events/events");
(0, events_1.events)(Client_1.client);
Client_1.client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.guild)
        return;
    if (interaction.isChatInputCommand()) {
        yield (0, list_1.executers)(interaction);
    }
    const user = UsersRepository_1.usersRepository.get(interaction.user.id);
    if (interaction.isButton()) {
        const buttonClickedIsPointButton = configs.buttonsPointIds.includes(interaction.customId);
        if (buttonClickedIsPointButton && !user) {
            yield UsersRepository_1.usersRepository.add(User_1.User.create({
                id: interaction.user.id,
                pointHours: 0,
                startedWorkAt: null
            }));
        }
        if (interaction.customId === 'open-point-button') {
            Client_1.client.emit('openPointButtonClicked', interaction, user);
        }
        if (interaction.customId === 'close-point-button') {
            Client_1.client.emit('closePointButtonClicked', interaction, user);
        }
        if (interaction.customId === 'show-hours-point-button') {
            Client_1.client.emit('showHoursButtonClicked', interaction, user);
        }
    }
}));
Client_1.client.on('voiceStateUpdate', (oldState, newState) => __awaiter(void 0, void 0, void 0, function* () {
    if (oldState.channel && !newState.channel) {
        const member = oldState.member;
        if (!member)
            return;
        const createUser = () => __awaiter(void 0, void 0, void 0, function* () {
            const user = User_1.User.create({
                id: member.id,
                pointHours: 0,
                startedWorkAt: null
            });
            yield UsersRepository_1.usersRepository.add(user);
            return user;
        });
        const user = UsersRepository_1.usersRepository.get(member.id) || (yield createUser());
        Client_1.client.emit('voiceChannelLeave', member, oldState.channel, user);
    }
}));
Client_1.client.login(process.env.TOKEN).then(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, load_1.load)({
        builders: list_1.builders,
        clientId: process.env.CLIENT_ID,
        guildId: process.env.GUILD_ID,
        token: process.env.TOKEN,
    });
}));
//# sourceMappingURL=index.js.map