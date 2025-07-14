import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase'; // Add missing import

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_your_publishable_key');

export const createCheckoutSession = async (courseId, userId) => {
  try {
    const { data: { sessionId }, error } = await supabase.functions.invoke('create-checkout-session', {
      body: { courseId, userId }
    });

    if (error) throw error;

    const stripe = await stripePromise;
    const { error: stripeError } = await stripe.redirectToCheckout({
      sessionId
    });

    if (stripeError) throw stripeError;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const createSubscriptionCheckout = async (priceId, userId) => {
  try {
    const { data: { sessionId }, error } = await supabase.functions.invoke('create-subscription', {
      body: { priceId, userId }
    });

    if (error) throw error;

    const stripe = await stripePromise;
    const { error: stripeError } = await stripe.redirectToCheckout({
      sessionId
    });

    if (stripeError) throw stripeError;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};