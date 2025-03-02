"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutFormProps {
  clientSecret: string
  amount: number
}

function CheckoutForm({ clientSecret, amount }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    })

    if (error) {
      setMessage(error.message || "An unknown error occurred")
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {message && <div className="text-red-500 text-sm">{message}</div>}
      <Button type="submit" className="w-full" disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
      </Button>
    </form>
  )
}

export function StripePaymentForm({ amount }: { amount: number }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const createIntent = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const contentType = response.headers.get("content-type")
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json()
          if (data.error) {
            throw new Error(data.error)
          }
          setClientSecret(data.clientSecret)
        } else {
          // If the response is not JSON, read it as text
          const text = await response.text()
          console.error("Non-JSON response:", text)
          throw new Error("Received non-JSON response from server")
        }
      } catch (error) {
        console.error("Error creating payment intent:", error)
        setError(error instanceof Error ? error.message : "An unexpected error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    createIntent()
  }, [amount])

  if (isLoading) {
    return <div className="py-4">Setting up payment form...</div>
  }

  if (error) {
    return <div className="py-4 text-red-500">{error}</div>
  }

  if (!clientSecret) {
    return <div className="py-4">Unable to load payment form. Please try again later.</div>
  }

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe" as const,
    },
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm clientSecret={clientSecret} amount={amount} />
    </Elements>
  )
}

