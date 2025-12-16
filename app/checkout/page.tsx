"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Truck, Package } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { formatPrice } from "@/lib/format-price"

const cartItems = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 627900,
    quantity: 1,
    image: "/wireless-headphones.png",
  },
  {
    id: "3",
    name: "Mechanical Gaming Keyboard",
    price: 312900,
    quantity: 1,
    image: "/gaming-keyboard.png",
  },
  {
    id: "5",
    name: "Wireless Mouse",
    price: 165900,
    quantity: 1,
    image: "/wireless-mouse.png",
  },
]

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 31500
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { num: 1, label: "Cart", icon: Package },
              { num: 2, label: "Shipping", icon: Truck },
              { num: 3, label: "Payment", icon: CreditCard },
            ].map((s, index) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      step >= s.num ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-foreground mt-2">{s.label}</span>
                </div>
                {index < 2 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded transition-colors ${step > s.num ? "bg-primary" : "bg-muted"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Cart */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground mb-6">Shopping Cart</h2>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-card rounded-lg border border-border">
                    <div className="h-20 w-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-6" size="lg" onClick={() => setStep(2)}>
                  Continue to Shipping
                </Button>
              </div>
            )}

            {/* Step 2: Shipping */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Shipping Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main St" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="San Francisco" />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="94102" />
                    </div>
                  </div>
                  <div>
                    <Label>Shipping Method</Label>
                    <RadioGroup defaultValue="standard" className="mt-2">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg mb-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="cursor-pointer">
                            Standard Shipping (5-7 days)
                          </Label>
                        </div>
                        <span className="font-semibold text-foreground">31,500 MMK</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="cursor-pointer">
                            Express Shipping (2-3 days)
                          </Label>
                        </div>
                        <span className="font-semibold text-foreground">52,500 MMK</span>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(1)}>
                      Back to Cart
                    </Button>
                    <Button className="flex-1" onClick={() => setStep(3)}>
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Payment Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(2)}>
                      Back to Shipping
                    </Button>
                    <Button className="flex-1">Complete Order</Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Order Summary</h3>
              <Separator className="my-4" />
              <div className="space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium text-foreground">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-medium text-foreground">{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span className="font-medium text-foreground">{formatPrice(tax)}</span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
