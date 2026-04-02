import Razorpay from 'razorpay';
import { VercelRequest, VercelResponse } from '@vercel/node';

const razorpay = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_TzGhz5H8Tf3hYV',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_TzGhz5H8Tf3hYV' // Placeholder for secret
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, currency = 'INR', receipt } = req.body;

  try {
    const options = {
      amount: amount * 100, // Amount in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json(order);
  } catch (error: any) {
    console.error('Razorpay Order Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
