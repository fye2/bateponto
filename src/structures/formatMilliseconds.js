"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMilliseconds = void 0;
function formatMilliseconds(miliseconds) {
    if (miliseconds === 0)
        return '0 segundos';
    let hours = Math.floor((miliseconds / 1000) / 3600);
    let minutes = Math.floor((miliseconds / 1000) % 3600 / 60);
    let seconds = Math.floor((miliseconds / 1000) % 3600 % 60);
    let displayHours = hours > 0 ? hours + (hours == 1 ? minutes > 0 ? seconds > 0 ? " hora, " : " hora, " : seconds > 0 ? " hora e " : " hora " : minutes > 0 ? " horas, " : " horas ") : "";
    let displayMinutes = minutes > 0 ? minutes + (minutes == 1 ? seconds > 0 ? " minuto e " : " minuto " : seconds > 0 ? " minutos e " : " minutos ") : "";
    let displaySeconds = seconds > 0 ? seconds + (seconds == 1 ? " segundo" : " segundos") : "";
    return displayHours + displayMinutes + displaySeconds;
}
exports.formatMilliseconds = formatMilliseconds;
//# sourceMappingURL=formatMilliseconds.js.map