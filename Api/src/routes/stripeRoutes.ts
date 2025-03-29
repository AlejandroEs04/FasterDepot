import { Request, Response, Router } from "express"
import cors from 'cors'
import Stripe from "stripe"
import { ProductCart } from "../types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const router = Router()

router.post('/create-checkout-session', async (req: Request, res: Response) => {
    const { cart } = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: cart.map((item : ProductCart) => ({
            price: item.stripePriceId,
            quantity: item.quantity
        })),
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/checkout`
    });

    res.json({ url: session.url });
});

router.get('/verify-payment', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id as string);
    res.json({ status: session.payment_status, email: session.customer_details?.email });
});

export default router;