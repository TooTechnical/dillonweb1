import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Our Company</h1>
      <Card>
        <CardHeader>
          <CardTitle>Our Expertise</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Our agency specializes in full-spectrum digital solution architecture, combining cutting-edge web
            technologies with market-specific strategies. Our team of 50+ certified developers delivers enterprise-grade
            implementations with 99.8% client retention since 2018.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

