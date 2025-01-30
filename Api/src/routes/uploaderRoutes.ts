import { Router } from "express"
import { UploaderController } from "../controllers/uploaderController"
import upload from "../config/multer"

const router = Router()

router.post('/', upload.single('image'), UploaderController.uploadImage)

export default router