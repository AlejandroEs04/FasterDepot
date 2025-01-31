"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploaderController = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
class UploaderController {
    static uploadImage = async (req, res) => {
        try {
            if (!req.file) {
                res.status(400).json({ message: 'No file uploaded' });
                return;
            }
            const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
            const result = await cloudinary_1.default.uploader.upload(base64Image, {
                upload_preset: 'gfvadegu'
            });
            const imageUrl = result.secure_url;
            res.status(200).json({ imageUrl });
            return;
        }
        catch (error) {
            res.status(500).json({ message: 'Error uploading image' + error });
            return;
        }
    };
}
exports.UploaderController = UploaderController;
