"use server"

import { Stripe } from "stripe"

// Initialize Stripe with your secret key
// In production, this should be stored as an environment variable
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function createPaymentIntent(amount: number) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      // In a real app, you might want to store customer information
      // payment_method_types: ['card'],
    })

    return {
      clientSecret: paymentIntent.client_secret,
    }
  } catch (error) {
    console.error("Error creating payment intent:", error)
    throw new Error("Failed to create payment intent")
  }
}

