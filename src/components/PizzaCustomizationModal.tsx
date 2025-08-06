import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
  category?: string;
}

interface PizzaCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  pizza: Pizza | null;
}

const sizes = [
  { id: "small", name: "Small (10\")", priceMultiplier: 0.8 },
  { id: "medium", name: "Medium (12\")", priceMultiplier: 1.0 },
  { id: "large", name: "Large (14\")", priceMultiplier: 1.3 },
  { id: "xlarge", name: "X-Large (16\")", priceMultiplier: 1.6 }
];

const crusts = [
  { id: "thin", name: "Thin Crust", price: 0 },
  { id: "thick", name: "Thick Crust", price: 2 },
  { id: "stuffed", name: "Cheese Stuffed", price: 4 },
  { id: "gluten-free", name: "Gluten Free", price: 3 }
];

const toppings = [
  { id: "pepperoni", name: "Pepperoni", price: 2.5, category: "Meat" },
  { id: "sausage", name: "Italian Sausage", price: 2.5, category: "Meat" },
  { id: "ham", name: "Ham", price: 2.0, category: "Meat" },
  { id: "bacon", name: "Bacon", price: 3.0, category: "Meat" },
  { id: "chicken", name: "Grilled Chicken", price: 3.5, category: "Meat" },
  { id: "mushrooms", name: "Mushrooms", price: 1.5, category: "Vegetable" },
  { id: "peppers", name: "Bell Peppers", price: 1.5, category: "Vegetable" },
  { id: "onions", name: "Red Onions", price: 1.0, category: "Vegetable" },
  { id: "olives", name: "Black Olives", price: 2.0, category: "Vegetable" },
  { id: "tomatoes", name: "Fresh Tomatoes", price: 1.5, category: "Vegetable" },
  { id: "spinach", name: "Fresh Spinach", price: 2.0, category: "Vegetable" },
  { id: "extra-cheese", name: "Extra Cheese", price: 2.5, category: "Cheese" },
  { id: "feta", name: "Feta Cheese", price: 3.0, category: "Cheese" }
];

export function PizzaCustomizationModal({ isOpen, onClose, pizza }: PizzaCustomizationModalProps) {
  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedCrust, setSelectedCrust] = useState("thin");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  
  const { addItem } = useCart();

  if (!pizza) return null;

  const selectedSizeData = sizes.find(s => s.id === selectedSize);
  const selectedCrustData = crusts.find(c => c.id === selectedCrust);
  const selectedToppingsData = toppings.filter(t => selectedToppings.includes(t.id));

  const basePrice = pizza.price * (selectedSizeData?.priceMultiplier || 1);
  const crustPrice = selectedCrustData?.price || 0;
  const toppingsPrice = selectedToppingsData.reduce((sum, topping) => sum + topping.price, 0);
  const totalPrice = (basePrice + crustPrice + toppingsPrice) * quantity;

  const handleToppingToggle = (toppingId: string) => {
    setSelectedToppings(prev => 
      prev.includes(toppingId) 
        ? prev.filter(id => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: `${pizza.id}-${selectedSize}-${selectedCrust}-${selectedToppings.join(',')}-${Date.now()}`,
      name: pizza.name,
      price: basePrice + crustPrice + toppingsPrice,
      quantity,
      size: selectedSize as "small" | "medium" | "large" | "xlarge",
      crust: selectedCrustData?.name || "Thin Crust",
      toppings: selectedToppingsData.map(t => t.name),
      image: pizza.image
    };

    addItem(cartItem);
    toast.success(`${quantity}x ${pizza.name} added to cart!`);
    onClose();
    
    // Reset form
    setSelectedSize("medium");
    setSelectedCrust("thin");
    setSelectedToppings([]);
    setQuantity(1);
  };

  const toppingsByCategory = toppings.reduce((acc, topping) => {
    if (!acc[topping.category]) acc[topping.category] = [];
    acc[topping.category].push(topping);
    return acc;
  }, {} as Record<string, typeof toppings>);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Customize Your {pizza.name}</DialogTitle>
          <DialogDescription>{pizza.description}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Customization Options */}
          <div className="space-y-6">
            {/* Size Selection */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Choose Size</h3>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                {sizes.map((size) => (
                  <div key={size.id} className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50">
                    <RadioGroupItem value={size.id} id={size.id} />
                    <Label htmlFor={size.id} className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>{size.name}</span>
                        <span className="text-primary font-medium">
                          ${(pizza.price * size.priceMultiplier).toFixed(2)}
                        </span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </Card>

            {/* Crust Selection */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Choose Crust</h3>
              <RadioGroup value={selectedCrust} onValueChange={setSelectedCrust}>
                {crusts.map((crust) => (
                  <div key={crust.id} className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50">
                    <RadioGroupItem value={crust.id} id={crust.id} />
                    <Label htmlFor={crust.id} className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>{crust.name}</span>
                        <span className="text-primary font-medium">
                          {crust.price > 0 ? `+$${crust.price.toFixed(2)}` : "Free"}
                        </span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </Card>

            {/* Toppings Selection */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Add Toppings</h3>
              <div className="space-y-4">
                {Object.entries(toppingsByCategory).map(([category, categoryToppings]) => (
                  <div key={category}>
                    <h4 className="font-medium text-muted-foreground mb-2">{category}</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {categoryToppings.map((topping) => (
                        <div key={topping.id} className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50">
                          <Checkbox
                            id={topping.id}
                            checked={selectedToppings.includes(topping.id)}
                            onCheckedChange={() => handleToppingToggle(topping.id)}
                          />
                          <Label htmlFor={topping.id} className="flex-1 cursor-pointer">
                            <div className="flex justify-between">
                              <span>{topping.name}</span>
                              <span className="text-primary font-medium">+${topping.price.toFixed(2)}</span>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right side - Preview and Order */}
          <div className="space-y-6">
            {/* Pizza Preview */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Your Pizza</h3>
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{pizza.image}</div>
                <h4 className="font-semibold">{pizza.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedSizeData?.name} • {selectedCrustData?.name}
                </p>
              </div>
              
              {selectedToppings.length > 0 && (
                <div>
                  <h5 className="font-medium mb-2">Added Toppings:</h5>
                  <div className="flex flex-wrap gap-1">
                    {selectedToppingsData.map((topping) => (
                      <Badge key={topping.id} variant="secondary" className="text-xs">
                        {topping.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Quantity and Price */}
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Quantity</h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-semibold min-w-[2rem] text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base Price ({selectedSizeData?.name}):</span>
                      <span>${basePrice.toFixed(2)}</span>
                    </div>
                    {crustPrice > 0 && (
                      <div className="flex justify-between">
                        <span>Crust ({selectedCrustData?.name}):</span>
                        <span>+${crustPrice.toFixed(2)}</span>
                      </div>
                    )}
                    {toppingsPrice > 0 && (
                      <div className="flex justify-between">
                        <span>Toppings:</span>
                        <span>+${toppingsPrice.toFixed(2)}</span>
                      </div>
                    )}
                    {quantity > 1 && (
                      <div className="flex justify-between">
                        <span>Quantity:</span>
                        <span>×{quantity}</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button onClick={handleAddToCart} className="w-full btn-primary" size="lg">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart - ${totalPrice.toFixed(2)}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}