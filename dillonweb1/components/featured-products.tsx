import { ProductCard } from "@/components/product-card"

export function FeaturedProducts() {
  // In a real app, this would come from an API or database
  const featuredProducts = [
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
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Products</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Check out our most popular items handpicked for you
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

