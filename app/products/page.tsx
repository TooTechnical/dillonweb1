import { ProductCard } from "@/components/product-card"

export default function ProductsPage() {
  // In a real app, this would come from an API or database
  const products = [
    {
      id: 1,
      name: "Premium T-Shirt",
      price: 29.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Clothing",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: 99.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
    },
    {
      id: 3,
      name: "Leather Wallet",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Accessories",
    },
    {
      id: 4,
      name: "Smart Watch",
      price: 199.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
    },
    {
      id: 5,
      name: "Running Shoes",
      price: 89.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Footwear",
    },
    {
      id: 6,
      name: "Coffee Maker",
      price: 129.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Home & Kitchen",
    },
    {
      id: 7,
      name: "Smartphone",
      price: 699.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
    },
    {
      id: 8,
      name: "Backpack",
      price: 59.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Accessories",
    },
  ]

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">All Products</h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Browse our complete collection of high-quality products
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

