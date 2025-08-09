import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Clock, CheckCircle, Truck } from "lucide-react";

// Mock order data - will be replaced with real data later
const mockOrders = [
  {
    id: "ORD-123456",
    date: "2024-01-15",
    status: "delivered",
    total: 285000, // in cents
    items: [
      {
        name: "Margherita Pizza",
        size: "large",
        quantity: 2,
        price: 120000
      },
      {
        name: "Pepperoni Pizza", 
        size: "medium",
        quantity: 1,
        price: 45000
      }
    ]
  },
  {
    id: "ORD-123455",
    date: "2024-01-10",
    status: "preparing",
    total: 180000,
    items: [
      {
        name: "Hawaiian Pizza",
        size: "large",
        quantity: 1,
        price: 180000
      }
    ]
  },
  {
    id: "ORD-123454",
    date: "2024-01-05",
    status: "on-delivery",
    total: 95000,
    items: [
      {
        name: "Veggie Supreme",
        size: "small",
        quantity: 1,
        price: 95000
      }
    ]
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "on-delivery":
      return <Truck className="h-4 w-4 text-blue-500" />;
    case "preparing":
      return <Clock className="h-4 w-4 text-orange-500" />;
    default:
      return <Package className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "delivered":
      return "Delivered";
    case "on-delivery":
      return "On Delivery";
    case "preparing":
      return "Preparing";
    default:
      return "Unknown";
  }
};

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "delivered":
      return "default";
    case "on-delivery":
      return "secondary";
    case "preparing":
      return "outline";
    default:
      return "outline";
  }
};

export function OrderHistory() {
  const formatPrice = (price: number) => {
    return `KSH ${(price / 100).toFixed(0)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Order History</h1>
          <p className="text-muted-foreground">Track your past and current orders</p>
        </div>

        {mockOrders.length === 0 ? (
          <Card className="p-8 text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
            <Button asChild>
              <a href="/">Start Shopping</a>
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {mockOrders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Order {order.id}</h3>
                    <p className="text-sm text-muted-foreground">{formatDate(order.date)}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={getStatusVariant(order.status)} className="mb-2">
                      <div className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {getStatusText(order.status)}
                      </div>
                    </Badge>
                    <p className="text-lg font-bold">{formatPrice(order.total)}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Items:</h4>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span>{item.quantity}x {item.name} ({item.size})</span>
                      <span>{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    {order.status === "delivered" && "Delivered successfully"}
                    {order.status === "on-delivery" && "Your order is on the way"}
                    {order.status === "preparing" && "Your order is being prepared"}
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      Track Order
                    </Button>
                    <Button variant="ghost" size="sm">
                      Reorder
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}