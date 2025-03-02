"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingBasket } from "lucide-react"
import { logout } from "@/lib/auth"
import { useBasketStore } from "@/lib/basketStore"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const basketItems = useBasketStore((state) => state.items)

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(userLoggedIn)
  }, [])

  const handleLogout = () => {
    logout("user-id") // Replace with actual user ID
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
    router.push("/")
  }

  return (
    <html lang="en">
      <body>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              DillonWeb
            </Link>
            <div className="space-x-4 flex items-center">
              <Link href="/services">
                <Button variant="ghost">Services</Button>
              </Link>
              <Link href="/company">
                <Button variant="ghost">Company</Button>
              </Link>
              <Link href="/basket">
                <Button variant="ghost">
                  <ShoppingBasket className="mr-2" />
                  Basket ({basketItems.length})
                </Button>
              </Link>
              {isLoggedIn ? (
                <>
                  <Link href="/account">
                    <Button variant="ghost">Account</Button>
                  </Link>
                  <Button variant="ghost" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="ghost">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}

