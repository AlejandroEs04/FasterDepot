import { Router } from "express"
import { BuyController } from "../controllers/buyController"
import { getAuth } from "../middleware/auth"

const router = Router()

router.get('/', getAuth, BuyController.getAllBuys)
router.post('/', BuyController.registerBuy)
router.post('/payer', BuyController.getPayerBuy)

export default router