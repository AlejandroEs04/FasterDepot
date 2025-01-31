"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cors_2 = require("./config/cors");
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const buyRoutes_1 = __importDefault(require("./routes/buyRoutes"));
const payPalRoutes_1 = __importDefault(require("./routes/payPalRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const uploaderRoutes_1 = __importDefault(require("./routes/uploaderRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cors_1.default)(cors_2.corsOptions));
// Routes 
app.use('/products', productRoutes_1.default);
app.use('/checkout', payPalRoutes_1.default);
app.use('/buy', buyRoutes_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/upload', uploaderRoutes_1.default);
exports.default = app;
