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
exports.collectOneOfButton = void 0;
const discord_js_1 = require("discord.js");
const events_1 = require("events");
const collectOneOfButton = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const buttonCollector = props.message.createMessageComponentCollector({
        filter: (interaction) => interaction.user.id === props.user.id && props.customIds.includes(interaction.customId),
        componentType: discord_js_1.ComponentType.Button,
        max: 1
    });
    const [collected, reason] = yield (0, events_1.once)(buttonCollector, 'end');
    const buttonInteraction = collected.last();
    if (!buttonInteraction || reason !== 'limit')
        return { buttonInteraction: null, reason };
    return { buttonInteraction, reason };
});
exports.collectOneOfButton = collectOneOfButton;
//# sourceMappingURL=collectOneOfButton.js.map