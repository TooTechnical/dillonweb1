"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getProduct, createComment } from "@/lib/api"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [comment, setComment] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getProduct(Number(params.id))
        setProduct(data)
      } catch (error) {
        console.error("Error fetching product:", error)
        setError("Failed to load product. Please check your API connection and try again.")
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [params.id])

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
  }

  const addToCart = () => {
    // Implement cart functionality
    alert(`Added ${quantity} ${product.name}(s) to cart`)
    router.push("/cart")
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createComment(product.id, comment)
      // Refresh product data to show new comment
      const updatedProduct = await getProduct(Number(params.id))
      setProduct(updatedProduct)
      setComment("")
    } catch (error) {
      console.error("Error submitting comment:", error)
      setError("Failed to submit comment. Please try again later.")
    }
  }

  if (loading) return <div className="container px-4 py-12">Loading...</div>
  if (error) return <div className="container px-4 py-12 text-red-500">{error}</div>
  if (!product) return <div className="container px-4 py-12">Product not found</div>

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="aspect-square object-cover"
            />
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
          <p className="text-muted-foreground">{product.description}</p>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => updateQuantity(quantity - 1)}>
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => updateQuantity(Number(e.target.value))}
                className="w-20 text-center"
              />
              <Button variant="outline" size="icon" onClick={() => updateQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button className="w-full" size="lg" onClick={addToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {product.comments && product.comments.length > 0 ? (
          product.comments.map((comment: any) => (
            <div key={comment.id} className="mb-4 p-4 border rounded">
              <p>{comment.text}</p>
              <p className="text-sm text-muted-foreground mt-2">
                By {comment.user.username} on {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
        <form onSubmit={handleCommentSubmit} className="mt-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Leave a comment..."
            rows={4}
          ></textarea>
          <Button type="submit" className="mt-2">
            Submit Comment
          </Button>
        </form>
      </div>
    </div>
  )
}

