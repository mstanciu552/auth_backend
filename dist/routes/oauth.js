"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var router = express_1.default.Router();
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile"] }));
router.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/login" }), function (_, res) {
    res.redirect("/");
});
exports.default = router;
//# sourceMappingURL=oauth.js.map