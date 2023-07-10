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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const user_model_1 = require("./user.model");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(user)
    if ((user === null || user === void 0 ? void 0 : user.role) === 'seller' && user.budget > 0) {
        throw new ApiError_1.default(400, 'you cannot set budget  you may can set income');
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) === 'buyer' && user.income > 0) {
        throw new ApiError_1.default(400, 'you cannot set income you may set budget');
    }
    else {
        const createUser = (yield user_model_1.User.create(user)).toObject();
        return createUser;
    }
});
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const getUsers = yield user_model_1.User.find({});
    return getUsers;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getUser = yield user_model_1.User.findById(id);
    return getUser;
});
const updateSingleUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteUser = yield user_model_1.User.findByIdAndDelete(id);
    return deleteUser;
});
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(phoneNumber);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin Doesn,t Exist');
    }
    if (isUserExist.password &&
        !(yield user_model_1.User.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    const { _id, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    console.log('verified token from service', verifiedToken);
    const { _id } = verifiedToken;
    const isUserExist = yield user_model_1.User.findOne({ _id }, { _id: 1, role: 1 });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        _id: isUserExist._id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const getMyProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(user)
    const getUsers = yield user_model_1.User.findById(userId);
    return getUsers;
});
const updateMyProfile = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(user)
    const result = yield user_model_1.User.findOneAndUpdate({ _id: userId }, payload, {
        new: true,
    });
    return result;
});
exports.UserService = {
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
