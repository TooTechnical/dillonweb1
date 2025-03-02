"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation to product page
    setIsAdding(true)

    // Simulate adding to cart
    setTimeout(() => {
      setIsAdding(false)
      alert(`Added ${product.name} to cart`)
    }, 500)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square relative bg-muted">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="space-y-1">
          <Link href={`/products/${product.id}`} className="font-medium hover:underline">
            {product.name}
          </Link>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="font-bold">${product.price.toFixed(2)}</div>
        <Button size="sm" variant="outline" onClick={addToCart} disabled={isAdding}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isAdding ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}

