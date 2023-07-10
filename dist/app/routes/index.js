"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const cow_route_1 = require("../modules/cow/cow.route");
const orders_route_1 = require("../modules/orders/orders.route");
const admin_route_1 = require("../modules/admin/admin.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/cows',
        route: cow_route_1.CowRouter,
    },
    {
        path: '/orders',
        route: orders_route_1.OrderRouter,
    },
    {
        path: '/admins',
        route: admin_route_1.AdminRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.routes = router;
