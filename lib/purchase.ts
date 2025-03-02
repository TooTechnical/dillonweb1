import { getUser } from "./auth"

export const validatePurchase = (userId: string | null) => {
  if (!userId) {
    throw new Error("User must be authenticated to complete purchase")
  }

  const user = getUser(userId)
  if (!user) {
    throw new Error("User not found")
  }

  if (user.cart.length === 0) {
    throw new Error("Cart is empty")
  }

  // Additional validation logic can be added here

  return true
}

