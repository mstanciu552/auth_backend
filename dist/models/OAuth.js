"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var OAuthSchema = new mongoose_1.default.Schema({
    googleID: {
        type: "string",
        required: true,
        unique: true,
    },
    displayName: {
        type: "string",
        required: true,
    },
    firstName: {
        type: "string",
        required: true,
    },
    lastName: {
        type: "string",
        required: true,
    },
    photo: {
        type: "string",
        required: true,
    },
});
exports.default = mongoose_1.default.model("OAuth", OAuthSchema);
//# sourceMappingURL=OAuth.js.map