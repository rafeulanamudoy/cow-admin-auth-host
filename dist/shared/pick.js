"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, keys) => {
    const finalObject = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObject[key] = obj[key];
        }
    }
    console.log(finalObject, 'im from pick');
    return finalObject;
};
exports.default = pick;
