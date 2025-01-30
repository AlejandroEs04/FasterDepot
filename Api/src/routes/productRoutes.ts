import { Router } from "express"
import { ProductController } from "../controllers/productController"
import upload from "../config/multer"
import multer from "multer"

const router = Router()

router.get('/', ProductController.getProducts)
router.post('/', ProductController.registerProduct)

export default router