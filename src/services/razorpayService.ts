export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact?: string;
  };
  notes?: {
    address?: string;
  };
  theme: {
    color: string;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (amount: number, userDetails: any) => {
  try {
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        ...userDetails,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create order');
    }

    return await response.json();
  } catch (error) {
    console.error('Order creation failed:', error);
    throw error;
  }
};

export const initializeRazorpayPayment = async (
  amount: number,
  userDetails: { name: string; email: string; contact?: string },
  onSuccess: (response: any) => void,
  onFailure: (error: any) => void
) => {
  try {
    // 1. Create order on backend
    const order = await createRazorpayOrder(amount, userDetails);

    // 2. Configure Razorpay options
    const options: RazorpayOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_TzGhz5H8Tf3hYV',
      amount: order.amount,
      currency: order.currency,
      name: 'Frozen Apple Weddings',
      description: 'Luxury Wedding Booking',
      image: '/pics/logo.png', // Replace with actual logo if available
      order_id: order.id,
      handler: function (response: any) {
        onSuccess(response);
      },
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.contact,
      },
      theme: {
        color: '#D4AF37', // Gold color from our theme
      },
    };

    // 3. Open Razorpay Checkouts
    const rzp1 = new window.Razorpay(options);
    
    rzp1.on('payment.failed', function (response: any) {
      onFailure(response.error);
    });

    rzp1.open();
  } catch (error) {
    onFailure(error);
  }
};
