import { loadStripe, Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error('Missing environment variable: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY')
    }
    
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromise
}

export async function createCheckoutSession(items: any[], customerId?: string) {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items,
      customerId,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Something went wrong with the checkout process')
  }

  const { sessionId } = await response.json()
  const stripe = await getStripe()
  
  if (!stripe) {
    throw new Error('Failed to load Stripe')
  }

  const { error } = await stripe.redirectToCheckout({ sessionId })
  
  if (error) {
    throw new Error(error.message || 'Something went wrong with the checkout process')
  }
}

export async function createPaymentIntent(amount: number, currency: string = 'usd', customerId?: string) {
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount,
      currency,
      customerId,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Something went wrong with the payment process')
  }

  return await response.json()
}