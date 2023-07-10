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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield user_service_1.UserService.createUser(user);
    // eslint-disable-next-line no-unused-vars
    if (result !== null) {
        // eslint-disable-next-line no-unused-vars
        const { password } = result, others = __rest(result, ["password"]);
        console.log(result);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Users created successfully',
            data: others,
        });
    }
}));
const getUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user, 'i am from user controller of user');
    console.log(req.headers.authorization);
    const result = yield user_service_1.UserService.getUsers();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Users retrieved successfully',
        data: result,
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.getSingleUser(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User retrieved successfully',
        data: result,
    });
}));
const updateSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateData = req.body;
    console.log(updateData);
    const result = yield user_service_1.UserService.updateSingleUser(id, updateData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User updated successfully',
        data: result,
    });
}));
const deleteSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.deleteSingleUser(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User Deleted successfully',
        data: result,
    });
}));
const userLogin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = __rest(req.body, []);
    const result = yield user_service_1.UserService.userLogin(loginData);
    //console.log(result)
    // set refresh token into cookie
    const cookieOptions = {
        secure: config_1.default.env === 'production',
        httpOnly: true,
    };
    if (result !== null) {
        const { refreshToken } = result, others = __rest(result, ["refreshToken"]);
        res.cookie('refreshToken', refreshToken, cookieOptions);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'User logged in successfully!',
            data: others,
        });
    }
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    //console.log('my cookies', req.cookies)
    const result = yield user_service_1.UserService.refreshToken(refreshToken);
    const cookieOptions = {
        secure: config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'New access token generated successfully !',
        data: result,
    });
}));
const getMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
    }
    let verifiedUser;
    // eslint-disable-next-line prefer-const
    verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const result = yield user_service_1.UserService.getMyProfile(verifiedUser._id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Users information retrieved successfully',
        data: result,
    });
}));
const updateMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const updateData = req.body;
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
    }
    let verifiedUser;
    // eslint-disable-next-line prefer-const
    verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const result = yield user_service_1.UserService.updateMyProfile(verifiedUser._id, updateData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Users information retrieved successfully',
        data: result,
    });
}));
exports.UserController = {
    createUser,
    getUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    userLogin,
    refreshToken,
    getMyProfile,
    updateMyProfile,
};
