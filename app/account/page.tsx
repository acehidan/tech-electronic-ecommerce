"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Package, MapPin, CreditCard } from "lucide-react"

const orders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 527,
    items: 3,
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-10",
    status: "In Transit",
    total: 299,
    items: 1,
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-05",
    status: "Processing",
    total: 149,
    items: 1,
  },
]

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Account</h1>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Addresses
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className="space-y-1 mb-4 md:mb-0">
                        <p className="font-semibold text-foreground">{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString()} • {order.items} items
                        </p>
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-md ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "In Transit"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-lg font-bold text-primary">${order.total}</p>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <Button>Save Changes</Button>
                </form>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button>Update Password</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Shipping Address</span>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-muted-foreground">
                    <p className="font-semibold text-foreground">John Doe</p>
                    <p>123 Main Street</p>
                    <p>Apt 4B</p>
                    <p>San Francisco, CA 94102</p>
                    <p>United States</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Billing Address</span>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-muted-foreground">
                    <p className="font-semibold text-foreground">John Doe</p>
                    <p>123 Main Street</p>
                    <p>Apt 4B</p>
                    <p>San Francisco, CA 94102</p>
                    <p>United States</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button className="mt-6 bg-transparent" variant="outline">
              <MapPin className="mr-2 h-4 w-4" />
              Add New Address
            </Button>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Saved Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-16 bg-primary/10 rounded flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
                <Button className="mt-6 bg-transparent" variant="outline">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
