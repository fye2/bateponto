"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const simpl_db_1 = require("simpl.db");
exports.db = new simpl_db_1.Database({
    collectionsFolder: './src/database/collections',
    dataFile: './src/database/database.json',
    tabSize: 2
});
//# sourceMappingURL=index.js.map