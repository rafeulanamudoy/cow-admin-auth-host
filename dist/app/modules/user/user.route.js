"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const role_1 = require("../../enums/role");
const router = express_1.default.Router();
exports.UserRoutes = router;
router.get('/my-profile', (0, auth_1.default)(role_1.Enum_Role.BUYER, role_1.Enum_Role.SELLER), user_controller_1.UserController.getMyProfile);
router.patch('/my-profile', (0, auth_1.default)(role_1.Enum_Role.BUYER, role_1.Enum_Role.SELLER), user_controller_1.UserController.updateMyProfile);
router.post('/signUp', user_controller_1.UserController.createUser);
router.post('/login', user_controller_1.UserController.userLogin);
router.get('/:id', (0, auth_1.default)(role_1.Enum_Role.ADMIN), user_controller_1.UserController.getSingleUser);
router.patch('/:id', (0, auth_1.default)(role_1.Enum_Role.ADMIN), user_controller_1.UserController.updateSingleUser);
router.delete('/:id', (0, auth_1.default)(role_1.Enum_Role.ADMIN), user_controller_1.UserController.deleteSingleUser);
router.get('/', (0, auth_1.default)(role_1.Enum_Role.ADMIN), user_controller_1.UserController.getUsers);
router.post('/refresh-token', (0, validateRequest_1.default)(user_validation_1.AuthValidation.refreshTokenZodSchema), user_controller_1.UserController.refreshToken);
//api/v1/auth/signup
