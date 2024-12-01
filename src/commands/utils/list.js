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
exports.executers = exports.builders = void 0;
const criar_ponto_1 = require("../criar-ponto");
const ranking_1 = require("../ranking");
const resetar_1 = require("../resetar");
const ver_horas_1 = require("../ver-horas");
exports.builders = [
    (0, criar_ponto_1.builder)(),
    (0, ranking_1.builder)(),
    (0, resetar_1.builder)(),
    (0, ver_horas_1.builder)()
];
const executers = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.inGuild()) {
        return interaction.reply({
            content: 'Você só pode utilizar meus comandos dentro de servidores.'
        });
    }
    const commandExecuters = [
        criar_ponto_1.executer,
        ranking_1.executer,
        resetar_1.executer,
        ver_horas_1.executer
    ];
    for (const commandExecuter of commandExecuters) {
        yield commandExecuter(interaction);
    }
});
exports.executers = executers;
//# sourceMappingURL=list.js.map