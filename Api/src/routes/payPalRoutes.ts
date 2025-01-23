import express, { Request, Response } from 'express';
import axios, { isAxiosError } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const PAYPAL_API = process.env.PAYPAL_API!;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!;

// Obtener token de autenticación desde PayPal
async function getPayPalAccessToken(): Promise<string> {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
    const response = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, 'grant_type=client_credentials', {
        headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    return response.data.access_token;
}

// Endpoint para crear un pedido
router.post('/create-order', async (req: Request, res: Response) => {
    try {
        const token = await getPayPalAccessToken();
        const order = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'MXN',
                        value: req.body.amount, // Monto dinámico desde el cliente
                    },
                },
            ],
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        res.json(order.data);
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.message) {
            res.status(500).json({ error: error.message });
        }
    }
});

// Endpoint para capturar el pago
router.post('/capture-order', async (req: Request, res: Response) => {
    try {
        const { orderId } = req.body;
        const token = await getPayPalAccessToken();
        const capture = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        res.json(capture.data);
    } catch (error) {
        if(isAxiosError(error) && error.message) {
            res.status(500).json({ error: error.message });
        }
    }
});

export default router;
