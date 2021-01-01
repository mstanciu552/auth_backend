"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGuest = exports.isAuthenticated = void 0;
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect("/login");
    }
};
exports.isAuthenticated = isAuthenticated;
var isGuest = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect("/");
    }
    else
        return next();
};
exports.isGuest = isGuest;
//# sourceMappingURL=middleware.js.map