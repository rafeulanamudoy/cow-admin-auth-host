"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./app/routes");
const globarErrorHandler_1 = __importDefault(require("./app/middleware/globarErrorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', routes_1.routes);
app.use(globarErrorHandler_1.default);
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!')
// })
exports.default = app;
