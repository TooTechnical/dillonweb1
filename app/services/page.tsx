"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { services } from "@/lib/services"
import { useBasketStore } from "@/lib/basketStore"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function ServicesPage() {
  const addItem = useBasketStore((state) => state.addItem)

  const handleAddToBasket = (serviceKey: string, itemName: string, itemPrice: number) => {
    addItem({
      id: `${serviceKey}-${itemName}`,
      name: itemName,
      price: itemPrice,
      quantity: 1,
    })
    toast.success(`Added ${itemName} to basket`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(services).map(([key, service]) => (
          <Card key={key} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {service.items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <div>
                      <span className="font-semibold mr-2">${item.price.toLocaleString()}</span>
                      <Button onClick={() => handleAddToBasket(key, item.name, item.price)}>Add to Basket</Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      <ToastContainer />
    </div>
  )
}

