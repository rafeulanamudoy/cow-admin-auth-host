"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("./orders.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const role_1 = require("../../enums/role");
const orderAuth_1 = __importDefault(require("../../middleware/orderAuth"));
const specificOrderAuth_1 = __importDefault(require("../../middleware/specificOrderAuth"));
const router = express_1.default.Router();
exports.OrderRouter = router;
router.post('/', (0, auth_1.default)(role_1.Enum_Role.BUYER), orders_controller_1.OrderController.createOrders);
router.get('/', (0, orderAuth_1.default)(), orders_controller_1.OrderController.getOrders);
router.get('/:id', (0, specificOrderAuth_1.default)(), orders_controller_1.OrderController.getSingleOrder);
