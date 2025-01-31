"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const buyController_1 = require("../controllers/buyController");
const router = (0, express_1.Router)();
router.post('/', buyController_1.BuyController.registerBuy);
router.post('/payer', buyController_1.BuyController.getPayerBuy);
exports.default = router;
