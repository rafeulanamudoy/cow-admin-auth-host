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
const orderAuth = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const orders = yield orders_model_1.Order.find({}).lean();
        // const orderCow = orders.find(order => order.cow)
        const buyerOrderExist = orders.find(order => order.buyer === verifiedUser._id);
        ///for seller portion
        //to get the seller cow from cow model
        const sellerCow = yield cow_model_1.Cow.find({ seller: verifiedUser._id }).lean();
        //to check weither the seller cow exist in order model
        const sellerCowId = sellerCow.map(cow => cow._id.toString());
        //console.log(sellerCowId)
        const sellerCowInOrder = orders.filter(order => sellerCowId.includes(order.cow));
        // console.log(sellerCowInOrder.length, 'in order section is cow exist')
        //console.log(resutl, 'the order cow that ')
        if ((verifiedUser.role == 'seller' && sellerCowInOrder.length === 0) ||
            (verifiedUser.role === 'buyer' && !buyerOrderExist)) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'your have no order to show');
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = orderAuth;
