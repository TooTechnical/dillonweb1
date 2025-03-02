import { getUser } from "./auth"

let anonymousCart: string[] = []

export const addToCart = (userId: string | null, serviceId: string) => {
  if (userId) {
    const user = getUser(userId)
    if (user) {
      user.cart.push(serviceId)
    }
  } else {
    anonymousCart.push(serviceId)
  }
}

export const removeFromCart = (userId: string | null, serviceId: string) => {
  if (userId) {
    const user = getUser(userId)
    if (user) {
      user.cart = user.cart.filter((id) => id !== serviceId)
    }
  } else {
    anonymousCart = anonymousCart.filter((id) => id !== serviceId)
  }
}

export const clearCart = (userId: string) => {
  const user = getUser(userId)
  if (user) {
    user.cart = []
  }
}

export const getCart = (userId: string | null): string[] => {
  if (userId) {
    const user = getUser(userId)
    return user ? user.cart : []
  }
  return anonymousCart
}

