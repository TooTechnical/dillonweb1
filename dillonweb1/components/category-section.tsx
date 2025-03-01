import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export function CategorySection() {
  // In a real app, this would come from an API or database
  const categories = [
    {
      id: 1,
      name: "Electronics",
      image: "/placeholder.svg?height=200&width=200",
      count: 42,
    },
    {
      id: 2,
      name: "Clothing",
      image: "/placeholder.svg?height=200&width=200",
      count: 56,
    },
    {
      id: 3,
      name: "Home & Kitchen",
      image: "/placeholder.svg?height=200&width=200",
      count: 38,
    },
    {
      id: 4,
      name: "Beauty & Personal Care",
      image: "/placeholder.svg?height=200&width=200",
      count: 24,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Shop by Category</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Browse our wide selection of categories to find exactly what you're looking for
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-square relative bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                    <span className="text-2xl font-bold">{category.name}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm text-muted-foreground">{category.count} items</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

