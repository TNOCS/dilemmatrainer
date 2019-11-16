"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_easy_loki_1 = require("rest-easy-loki");
exports.collectionName = 'documents';
const port = process.env.LOKI_PORT || '3030';
const dbName = process.env.LOKI_DB || './db/locatieregister.db';
const cors = (process.env.LOKI_CORS || 'true') === 'true';
const sizeLimit = process.env.LOKI_SIZE_LIMIT || '250mb';
exports.startService = () => {
    rest_easy_loki_1.db.startDatabase(dbName, () => {
        const api = rest_easy_loki_1.createApi({ cors, sizeLimit });
        api.listen(port);
        console.log(`Server running on port ${port}.`);
    });
};
exports.startService();
//# sourceMappingURL=server.js.map