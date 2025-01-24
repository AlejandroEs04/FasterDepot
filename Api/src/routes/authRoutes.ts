import { Router } from "express"
import { AuthController } from "../controllers/authController"
import { getAuth } from "../middleware/auth"

const router = Router()

router.post('/', AuthController.login)
router.get('/', getAuth, AuthController.auth)
router.post('/signup', AuthController.registerUser)

export default router