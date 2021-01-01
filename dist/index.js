"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv = __importStar(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var express_session_1 = __importDefault(require("express-session"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var passport_1 = __importDefault(require("passport"));
var auth_js_1 = __importDefault(require("./routes/auth.js"));
var oauth_js_1 = __importDefault(require("./routes/oauth.js"));
var passport_js_1 = require("./passport.js");
var app = express_1.default();
var MongoStore = connect_mongo_1.default(express_session_1.default);
// Set up dotenv
dotenv.config();
// Set up database
mongoose_1.default.connect("mongodb://localhost:27017/" + process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var db = mongoose_1.default.connection;
db.on("error", function (err) { return console.error(err); });
db.once("open", function () { return console.log("Database running"); });
// Passport config
passport_js_1.passportConfig(passport_1.default);
// Middleware
app.use(express_1.default.json());
app.use(express_session_1.default({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db }),
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Routes
app.use("/", auth_js_1.default);
app.use("/auth", oauth_js_1.default);
app.listen(process.env.PORT || 4000, function () {
    return console.log("Server listening on port " + process.env.PORT);
});
//# sourceMappingURL=index.js.map