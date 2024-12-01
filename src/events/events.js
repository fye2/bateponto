"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const closePointButtonClicked_1 = __importDefault(require("./closePointButtonClicked"));
const guildMemberRemove_1 = __importDefault(require("./guildMemberRemove"));
const openPointButtonClicked_1 = __importDefault(require("./openPointButtonClicked"));
const showHoursButtonClicked_1 = __importDefault(require("./showHoursButtonClicked"));
const voiceChannelLeave_1 = __importDefault(require("./voiceChannelLeave"));
const events = (client) => {
    (0, closePointButtonClicked_1.default)(client);
    (0, openPointButtonClicked_1.default)(client);
    (0, showHoursButtonClicked_1.default)(client);
    (0, voiceChannelLeave_1.default)(client),
        (0, guildMemberRemove_1.default)(client);
};
exports.events = events;
//# sourceMappingURL=events.js.map