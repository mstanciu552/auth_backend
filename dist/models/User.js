"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var User = new mongoose_1.default.Schema({
    email: {
        type: "string",
    },
    username: {
        type: "string",
        required: true,
    },
    first_name: {
        type: "string",
        required: true,
    },
    last_name: {
        type: "string",
        required: true,
    },
    password: {
        type: "string",
        required: true,
    },
});
exports.default = mongoose_1.default.model("User", User);
//# sourceMappingURL=User.js.map