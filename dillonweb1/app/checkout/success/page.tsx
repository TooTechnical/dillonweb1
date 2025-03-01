import Link from "next/link"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckoutSuccessPage() {
  return (
    <div className="container flex items-center justify-center px-4 py-24 md:px-6">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
          <CardDescription>Thank you for your purchase. Your order has been successfully processed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="text-sm text-muted-foreground mb-2">Order Number</div>
            <div className="font-medium">#DW-{Math.floor(100000 + Math.random() * 900000)}</div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <p>A confirmation email has been sent to your email address with all the details of your order.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Link href="/products" className="w-full">
            <Button className="w-full">Continue Shopping</Button>
          </Link>
          <Link href="/account/orders" className="w-full">
            <Button variant="outline" className="w-full">
              View Order History
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

