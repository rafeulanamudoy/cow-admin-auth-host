"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRouter = void 0;
const express_1 = __importDefault(require("express"));
const cow_controller_1 = require("./cow.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const role_1 = require("../../enums/role");
const specificSellerAuth_1 = __importDefault(require("../../middleware/specificSellerAuth"));
const router = express_1.default.Router();
exports.CowRouter = router;
router.post('/', (0, auth_1.default)(role_1.Enum_Role.SELLER), cow_controller_1.CowController.createCow);
router.get('/:id', cow_controller_1.CowController.getSingleCow);
router.patch('/:id', (0, specificSellerAuth_1.default)(), cow_controller_1.CowController.updateSingleCow);
router.delete('/:id', (0, specificSellerAuth_1.default)(), cow_controller_1.CowController.deleteSingleCow);
router.get('/', cow_controller_1.CowController.getCows);
