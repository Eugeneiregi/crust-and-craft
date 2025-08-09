import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { Phone, Clock, CheckCircle, Copy } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export function Checkout() {
  const { state } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const paymentNumber = "0712345678";

  // Debug: Log cart state
  console.log("Cart state in checkout:", state);

  // If cart is empty, redirect back to menu
  if (state.items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container max-w-2xl mx-auto px-4">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Add some items to your cart before proceeding to checkout.
            </p>
            <Link to="/menu">
              <Button>Browse Menu</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return `KSH ${(price / 100).toFixed(0)}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentNumber);
    toast.success("Phone number copied to clipboard!");
  };

  const handleOrderConfirm = () => {
    setOrderPlaced(true);
    toast.success("Order confirmed! You'll receive a call shortly.");
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container max-w-2xl mx-auto px-4">
          <Card className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Your order has been placed successfully. You will receive a call shortly to confirm your payment and delivery details.
            </p>
            <div className="space-y-4">
              <p className="text-sm">
                Order ID: <span className="font-mono font-semibold">#ORD-{Date.now().toString().slice(-6)}</span>
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/order-history">
                  <Button variant="outline">View Order History</Button>
                </Link>
                <Link to="/">
                  <Button>Continue Shopping</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground">Review your order and complete payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <div className="text-sm text-muted-foreground">
                        <p>Size: {item.size} • Crust: {item.crust}</p>
                        <p>Toppings: {item.toppings.length > 0 ? item.toppings.join(", ") : "None"}</p>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <Badge variant="secondary">Qty: {item.quantity}</Badge>
                        <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">{formatPrice(state.total)}</span>
              </div>
            </Card>
          </div>

          {/* Payment Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Payment Information
              </h2>
              <div className="space-y-4">
                <div className="text-center p-6 bg-muted rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Call for Payment</h3>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-2xl font-bold font-mono">{paymentNumber}</span>
                    <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Call the number above to complete your payment
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Payment confirmation within 5 minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>Delivery within 30-45 minutes after payment</span>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Payment Instructions:</h4>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Call the number above</li>
                    <li>Provide your order total: <strong>{formatPrice(state.total)}</strong></li>
                    <li>Our agent will process your payment</li>
                    <li>Confirm your delivery address</li>
                  </ol>
                </div>

                <Button onClick={handleOrderConfirm} className="w-full" size="lg">
                  Confirm Order
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}