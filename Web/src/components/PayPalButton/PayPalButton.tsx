import React, { useEffect } from 'react';
import { loadScript } from '@paypal/paypal-js';
import { captureOrder, createOrder } from '../../api/checkout';

interface PayPalButtonProps {
    amount: number;
    onSuccess: (details: any) => void;
    generate: boolean
    setGenerate: React.Dispatch<React.SetStateAction<boolean>>
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onSuccess, generate, setGenerate }) => {
    useEffect(() => {
        if(!generate) return;

        loadScript({ 'clientId': import.meta.env.VITE_PAYPAL_CLIENT_ID!, 'currency': 'MXN', 'locale': 'es_MX' }).then((paypal) => {
            paypal?.Buttons!({
                createOrder: async () => {
                    const data = await createOrder(amount)
                    return data;
                },
                onApprove: async (data) => {
                    const res = await captureOrder(data.orderID)
                    onSuccess(res);
                },
                onError: (err) => {
                    console.error('PayPal Checkout onError', err);
                }
            }).render('#paypal-button-container');
        });

        setGenerate(false)
    }, [amount, onSuccess]);

    return <div id="paypal-button-container"></div>;
};

export default PayPalButton;
