import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(request: Request) {
  try {
    console.log("Received request to create payment intent")
    const { amount } = await request.json()
    console.log("Amount:", amount)

    if (!amount || typeof amount !== "number") {
      console.log("Invalid amount")
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    console.log("Creating payment intent with Stripe")
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    })
    console.log("Payment intent created:", paymentIntent.id)

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json(
      {
        error: "Failed to create payment intent",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

