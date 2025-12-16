export function formatPrice(price: number): string {
  // Format with commas for thousands
  return price.toLocaleString("en-US") + " MMK"
}

export function formatPriceLakhs(price: number): string {
  // Convert to lakhs format if price is large enough (> 100,000)
  if (price >= 100000) {
    const lakhs = (price / 100000).toFixed(1)
    return lakhs + " Lakhs MMK"
  }
  return formatPrice(price)
}
