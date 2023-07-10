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
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../config"));
const orders_model_1 = require("../modules/orders/orders.model");
const cow_model_1 = require("../modules/cow/cow.model");
const specificOrderAuth = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //get authorization token
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
        // verify token
        let verifiedUser;
        // eslint-disable-next-line prefer-const
        verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        req.user = verifiedUser; // role  , _id
        //for buyer portion
        const orderId = req.params.id;
        const order = yield orders_model_1.Order.findById(orderId).lean();
        //for seller portion
        const cowOwner = yield cow_model_1.Cow.findById(order === null || order === void 0 ? void 0 : order.cow).populate('seller').lean();
        if ((verifiedUser.role === 'buyer' && (order === null || order === void 0 ? void 0 : order.buyer) !== verifiedUser._id) ||
            (verifiedUser.role == 'seller' &&
                ((_a = cowOwner === null || cowOwner === void 0 ? void 0 : cowOwner.seller._id) === null || _a === void 0 ? void 0 : _a.toString()) !== verifiedUser._id)) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'you are forbidden');
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = specificOrderAuth;
