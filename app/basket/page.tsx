"use client"

import { useBasketStore } from "@/lib/basketStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function BasketPage() {
  const { items, removeItem, updateQuantity, clearBasket } = useBasketStore()

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Basket</h1>
      {items.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>${item.price.toLocaleString()} each</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value))}
                    className="w-20"
                  />
                  <Button variant="destructive" onClick={() => removeItem(item.id)}>
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-between items-center">
            <Button variant="outline" onClick={clearBasket}>
              Clear Basket
            </Button>
            <div className="text-xl font-bold">Total: ${total.toLocaleString()}</div>
          </div>
          <div className="mt-8 flex justify-end">
            <Link href="/checkout">
              <Button>Proceed to Checkout</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

