"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const loginValidation_1 = require("../../../shared/loginValidation");
const router = express_1.default.Router();
exports.AdminRouter = router;
router.post('/create-admin', admin_controller_1.AdminController.createAdmin);
router.post('/login', (0, validateRequest_1.default)(loginValidation_1.loginValidation.loginZodSchema), admin_controller_1.AdminController.adminLogin);
