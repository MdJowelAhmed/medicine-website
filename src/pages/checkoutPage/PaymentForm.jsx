import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../components/hook/useAxiosSecure';

const PaymentForm = ({ 
  total, 
  customerInfo, 
  cartItems, 
  onPaymentSuccess, 
  onPaymentError,
  isProcessing,
  setIsProcessing 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const handleStripePayment = async () => {
    if (!stripe || !elements) {
      onPaymentError('Stripe not loaded properly');
      return;
    }

    // Validate form before processing payment
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode'];
    const missingFields = requiredFields.filter(field => !customerInfo[field] || !customerInfo[field].trim());
    
    if (missingFields.length > 0) {
      onPaymentError('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment intent on your backend using Axios
      const response = await axiosSecure.post('/create-payment-intent', {
        total: total,
        customerInfo: customerInfo,
        items: cartItems
      });

      console.log('Payment intent response:', response.data);

      // Extract clientSecret from Axios response
      const { clientSecret } = response.data;

      if (!clientSecret) {
        throw new Error('No client secret received from server');
      }

      // Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: {
              line1: customerInfo.address,
              city: customerInfo.city,
              postal_code: customerInfo.postalCode,
              country: customerInfo.country === 'Bangladesh' ? 'BD' : 'US',
            },
          },
        },
      });

      if (result.error) {
        console.error('Payment error:', result.error);
        onPaymentError(result.error.message);
      } else {
        console.log('Payment successful:', result.paymentIntent);
        
        // Save payment data to database
        try {
          const paymentData = {
            orderId: result.paymentIntent.id.toUpperCase(),
            transactionId: result.paymentIntent.id,
            amount: total
          };

          const paymentResponse = await axiosSecure.post('/payments', paymentData);
          console.log('Payment saved to database:', paymentResponse.data);
        } catch (dbError) {
          console.error('Error saving payment to database:', dbError);
          // Continue with success flow even if DB save fails
        }

        // Payment successful
        const orderData = {
          id: result.paymentIntent.id.toUpperCase(),
          stripePaymentId: result.paymentIntent.id,
          customerInfo,
          items: cartItems,
          subtotal: (total - (total * 0.05) - (total > 50 ? 0 : 5)).toFixed(2),
          tax: (total * 0.05).toFixed(2),
          shipping: (total > 50 ? 0 : 5).toFixed(2),
          total: total.toFixed(2),
          status: 'paid',
          paymentMethod: 'stripe',
          date: new Date().toISOString()
        };

        onPaymentSuccess(orderData);
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Server error occurred';
        onPaymentError(`Server Error: ${errorMessage}`);
      } else if (error.request) {
        // Request was made but no response received
        onPaymentError('Network error: Unable to connect to payment server');
      } else {
        // Something else happened
        onPaymentError(error.message || 'An unexpected error occurred');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>
      
      <button
        type="button" // Changed from "submit" to "button" to avoid nested form issues
        onClick={handleStripePayment}
        disabled={!stripe || isProcessing}
        className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition ${
          isProcessing || !stripe
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing Payment...
          </span>
        ) : (
          `Pay $${total.toFixed(2)}`
        )}
      </button>
    </div>
  );
};

export default PaymentForm;