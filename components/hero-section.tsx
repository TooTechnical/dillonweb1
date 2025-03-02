import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Welcome to DillonWeb</h1>
            <p className="text-muted-foreground md:text-xl">
              Discover our comprehensive range of web development and blockchain services. From custom website
              architecture to decentralized trading platforms, we've got you covered.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/services">
                <Button size="lg">Our Services</Button>
              </Link>
              <Link href="/company">
                <Button variant="outline" size="lg">
                  About Us
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                Expert Web & Blockchain Solutions
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

