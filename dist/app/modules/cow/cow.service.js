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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const cow_model_1 = require("./cow.model");
const createCow = (cow) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(cow);
    const createdCow = yield cow_model_1.Cow.create(cow);
    return createdCow;
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getCow = yield cow_model_1.Cow.findById(id).populate('seller');
    return getCow;
});
const updateSingleCow = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteCow = yield cow_model_1.Cow.findByIdAndDelete(id);
    return deleteCow;
});
const cowSearchableField = [
    'query',
    'location',
    'breed,age',
    'category',
    'weight',
    'label',
];
const getCows = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { skip, limit, page, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { query } = filters, filtersData = __rest(filters
    //const { price, age } = filtersData
    , ["query"]);
    //const { price, age } = filtersData
    console.log(filtersData, 'i am from service to check filter data');
    const andCondition = [];
    if (query) {
        andCondition.push({
            $or: cowSearchableField.map(field => ({
                [field]: {
                    $regex: query,
                    $options: 'i',
                },
            })),
        });
    }
    //console.log(filtersData, query, 'im from service')
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => {
                if (field === 'price' || field === 'age') {
                    const numericValue = parseFloat(value);
                    return { [field]: numericValue };
                }
                else if (field === 'minPrice') {
                    const parsingMinPrice = parseInt(value);
                    return { price: { $lt: parsingMinPrice } };
                }
                else if (field === 'maxPrice') {
                    const parsingMaxPrice = parseInt(value);
                    return { price: { $gt: parsingMaxPrice } };
                }
                return { [field]: { $regex: value, $options: 'i' } };
            }),
        });
    }
    console.log(andCondition, 'i am from service to check entries');
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    console.log(sortCondition, 'to check sort condition');
    const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield cow_model_1.Cow.find(whereConditions)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const count = yield cow_model_1.Cow.countDocuments();
    if (andCondition.length > 0) {
        return {
            meta: {
                page,
                limit,
            },
            data: result,
        };
    }
    else {
        return {
            meta: {
                page,
                limit,
                count,
            },
            data: result,
        };
    }
});
exports.CowService = {
    createCow,
    getSingleCow,
    updateSingleCow,
    deleteSingleCow,
    getCows,
};
// if (Object.keys(filtersData).length) {
//     andCondition.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: { $regex: value, $options: 'i' },
//       })),
//     })
//   }
