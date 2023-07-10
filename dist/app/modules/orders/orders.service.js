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
exports.OrderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orders_model_1 = require("./orders.model");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const cow_model_1 = require("../cow/cow.model");
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(order)
    const buyer = yield user_model_1.User.findById(order.buyer);
    const cow = yield cow_model_1.Cow.findById(order.cow);
    if (buyer && cow && buyer.budget < cow.price) {
        throw new ApiError_1.default(http_status_1.default.BAD_GATEWAY, "You don't have enough budget to buy the cow");
    }
    const session = yield mongoose_1.default.startSession();
    let createdOrder = null;
    try {
        session.startTransaction();
        createdOrder = yield orders_model_1.Order.create([order], { session });
        const cowFilter = { label: 'sold out' };
        const BuyerRemainingMoney = buyer && cow ? (buyer === null || buyer === void 0 ? void 0 : buyer.budget) - (cow === null || cow === void 0 ? void 0 : cow.price) : undefined;
        const sellerId = cow === null || cow === void 0 ? void 0 : cow.seller.toString();
        const buyerFilterMoney = { budget: BuyerRemainingMoney };
        yield user_model_1.User.findOneAndUpdate({ _id: order.buyer }, buyerFilterMoney);
        yield user_model_1.User.findOneAndUpdate({ _id: sellerId }, { income: cow === null || cow === void 0 ? void 0 : cow.price });
        yield cow_model_1.Cow.findOneAndUpdate({ _id: order.cow }, cowFilter);
        if (!createdOrder.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Order');
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return createdOrder[0];
});
const getOrders = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const sellerCow = yield cow_model_1.Cow.find({ seller: user._id }).lean();
    const sellerCowId = sellerCow.map(cow => cow._id.toString());
    const filter = user.role === 'buyer'
        ? { buyer: user._id }
        : user.role === 'seller'
            ? { cow: { $in: sellerCowId } }
            : {};
    const getOrders = yield orders_model_1.Order.find(filter);
    return getOrders;
});
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getOrder = yield orders_model_1.Order.findById(id);
    return getOrder;
});
exports.OrderService = {
    createOrder,
    getOrders,
    getSingleOrder,
};
