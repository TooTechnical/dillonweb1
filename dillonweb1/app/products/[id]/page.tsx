"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)

  // In a real app, this would come from an API or database
  const product = {
    id: Number.parseInt(params.id),
    name: "Premium T-Shirt",
    price: 29.99,
    description: "A high-quality, comfortable t-shirt made from 100% organic cotton. Perfect for everyday wear.",
    features: [
      "100% organic cotton",
      "Comfortable fit",
      "Machine washable",
      "Available in multiple colors",
      "Sustainable manufacturing",
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.5,
    reviews: 128,
    category: "Clothing",
    inStock: true,
  }

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="aspect-square object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg bg-muted">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  width={200}
                  height={200}
                  className="aspect-square object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <Link
              href={`/categories/${product.category.toLowerCase()}`}
              className="text-sm font-medium text-muted-foreground hover:underline"
            >
              {product.category}
            </Link>
            <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : i < product.rating
                          ? "fill-primary text-primary opacity-50"
                          : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            <div className="mt-4 text-3xl font-bold">${product.price.toFixed(2)}</div>
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground">{product.description}</p>
            <ul className="space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  • {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => updateQuantity(quantity - 1)}>
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => updateQuantity(Number.parseInt(e.target.value) || 1)}
                className="w-20 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <Button variant="outline" size="icon" onClick={() => updateQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <Button className="w-full" size="lg" onClick={() => alert("Item added to cart")}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p>
                This premium t-shirt is designed for comfort and style. Made from 100% organic cotton, it's soft to the
                touch and environmentally friendly. The classic fit makes it perfect for everyday wear, whether you're
                heading to the office, going for a casual outing, or just relaxing at home.
              </p>
              <p className="mt-4">
                Available in multiple colors and sizes, this versatile t-shirt is a must-have addition to any wardrobe.
                The high-quality fabric ensures durability, so you can enjoy wearing it for years to come.
              </p>
            </TabsContent>
            <TabsContent value="specifications" className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Material</h3>
                  <p className="text-sm text-muted-foreground">100% Organic Cotton</p>
                </div>
                <div>
                  <h3 className="font-medium">Fit</h3>
                  <p className="text-sm text-muted-foreground">Regular</p>
                </div>
                <div>
                  <h3 className="font-medium">Care</h3>
                  <p className="text-sm text-muted-foreground">Machine wash cold, tumble dry low</p>
                </div>
                <div>
                  <h3 className="font-medium">Origin</h3>
                  <p className="text-sm text-muted-foreground">Ethically made in USA</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="font-medium">John D.</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 5 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Great quality t-shirt. Very comfortable and fits perfectly. Will definitely buy more colors.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="font-medium">Sarah M.</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Nice material and good fit. The color is exactly as shown in the pictures.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

