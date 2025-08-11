import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface CartDrawerProps {
  children: React.ReactNode;
}

export function CartDrawer({ children }: CartDrawerProps) {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const formatPrice = (price: number) => {
    return `KSH ${(price / 100).toFixed(0)}`;
  };

  const getToppingsList = (toppings: string[]) => {
    return toppings.length > 0 ? toppings.join(", ") : "No extra toppings";
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart ({state.items.length} {state.items.length === 1 ? 'item' : 'items'})
          </DrawerTitle>
          <DrawerDescription>
            Review your order before checkout
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4 flex-1 overflow-y-auto">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-4">Add some delicious pizzas to get started!</p>
              <DrawerClose asChild>
                <Button>Browse Menu</Button>
              </DrawerClose>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-card rounded-lg border">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Size: {item.size}</p>
                      <p>Crust: {item.crust}</p>
                      <p>Toppings: {getToppingsList(item.toppings)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Badge variant="secondary" className="px-3">
                          {item.quantity}
                        </Badge>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {state.items.length > 0 && (
          <DrawerFooter className="border-t">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Total: {formatPrice(state.total)}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="text-destructive hover:text-destructive"
              >
                Clear Cart
              </Button>
            </div>
            <div className="flex gap-2">
              <DrawerClose asChild>
                <Button variant="outline" className="flex-1">
                  Continue Shopping
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button className="flex-1 bg-gradient-warm hover:opacity-90" asChild>
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}