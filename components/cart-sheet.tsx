"use client";

import { X, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/format-price";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSheet({ isOpen, onClose }: CartSheetProps) {
  const { items, removeItem, updateQuantity, cartTotal, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={`fixed inset-y-0 right-0 z-50 h-full w-full sm:w-[400px] border-l bg-background p-0 shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              {t("yourCart")}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-auto text-primary hover:text-primary hover:bg-primary/5">
              ပစ္စည်းများကြည့်မယ်
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                  <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{t("cartEmpty")}</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    {t("cartEmptyDesc")}
                  </p>
                </div>
                <Button onClick={onClose}>{t("startShopping")}</Button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  if (!product) return null;

                  return (
                    <div key={item.productId} className="flex gap-4">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-secondary">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="grid gap-1">
                          <Link
                            href={`/product/${product.id}`}
                            onClick={onClose}
                            className="font-medium line-clamp-2 hover:text-primary"
                          >
                            {product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.productId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t px-6 py-4 space-y-4">
              <div className="flex items-center justify-between text-base font-semibold">
                <span>{t("total")}</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {t("shippingTaxCalc")}
              </p>
              <div className="grid gap-2">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setShowCheckoutModal(true)}
                >
                  အော်ဒါတင်မည်
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  {t("clearCart")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <div className="bg-background p-8 rounded-xl shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-200">
            {!orderSuccess ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-foreground">
                    အော်ဒါတင်ခြင်း
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowCheckoutModal(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Order Summary Summary */}
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span className="text-muted-foreground">စုစုပေါင်း ကျသင့်ငွေ</span>
                      <span className="text-primary">{formatPrice(cartTotal)}</span>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">အမည် (Name)</Label>
                      <Input
                        id="name"
                        placeholder="သင့်အမည်ထည့်ပါ"
                        className="h-11"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">ဖုန်းနံပါတ် (Phone Number)</Label>
                      <Input
                        id="phone"
                        placeholder="၀၉xxxxxxxx"
                        className="h-11"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">ပို့ဆောင်ရမည့် လိပ်စာ (Address)</Label>
                      <textarea
                        id="address"
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="အိမ်အမှတ်၊ လမ်း၊ မြို့နယ် ထည့်ပါ"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      if (formData.name && formData.phone && formData.address) {
                        setOrderSuccess(true);
                        setTimeout(() => {
                          clearCart();
                          setShowCheckoutModal(false);
                          setOrderSuccess(false);
                          setFormData({ name: "", phone: "", address: "" });
                          onClose();
                        }, 3000);
                      }
                    }}
                    className="w-full h-12 text-lg font-bold"
                    disabled={!formData.name || !formData.phone || !formData.address}
                  >
                    အော်ဒါအတည်ပြုမည်
                  </Button>
                </div>
              </>
            ) : (
              <div className="py-10 text-center space-y-4">
                <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-12 w-12 rotate-45" /> {/* Success checkmark alternative */}
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  အော်ဒါတင်ခြင်း အောင်မြင်ပါသည်။
                </h3>
                <p className="text-muted-foreground">
                  မကြာမီ လူကြီးမင်းထံသို့ ဖုန်းဆက်သွယ်ပေးပါမည်။
                </p>
                <p className="text-sm font-medium text-primary pt-4">
                  ကျေးဇူးတင်ရှိပါသည်။
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
