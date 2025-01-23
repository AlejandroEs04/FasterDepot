import { Router } from "express"
import { BuyController } from "../controllers/buyController"

const router = Router()

router.post('/', BuyController.registerBuy)
router.post('/payer', BuyController.getPayerBuy)

export default router