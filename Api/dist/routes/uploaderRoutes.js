"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploaderController_1 = require("../controllers/uploaderController");
const multer_1 = __importDefault(require("../config/multer"));
const router = (0, express_1.Router)();
router.post('/', multer_1.default.single('image'), uploaderController_1.UploaderController.uploadImage);
exports.default = router;
