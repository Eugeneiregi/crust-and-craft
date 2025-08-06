import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { PizzaCustomizationModal } from "./PizzaCustomizationModal";
import margheritaImage from "@/assets/margherita-pizza.jpg";
import pepperoniImage from "@/assets/pepperoni-pizza.jpg";
import supremeImage from "@/assets/supreme-pizza.jpg";
import hawaiianImage from "@/assets/hawaiian-pizza.jpg";

const featuredPizzas = [
  {
    id: 1,
    name: "Margherita Classic",
    description: "Fresh mozzarella, tomato sauce, basil, olive oil",
    price: 16.99,
    image: margheritaImage,
    rating: 4.8,
    isPopular: true,
    category: "Classic"
  },
  {
    id: 2,
    name: "Pepperoni Supreme",
    description: "Premium pepperoni, mozzarella, tomato sauce",
    price: 19.99,
    image: pepperoniImage,
    rating: 4.9,
    isPopular: true,
    category: "Classic"
  },
  {
    id: 3,
    name: "Veggie Garden",
    description: "Bell peppers, mushrooms, onions, olives, tomatoes",
    price: 18.99,
    image: supremeImage,
    rating: 4.6,
    isPopular: false,
    category: "Vegetarian"
  },
  {
    id: 4,
    name: "Hawaiian Paradise",
    description: "Ham, pineapple, mozzarella cheese, tomato sauce",
    price: 21.99,
    image: hawaiianImage,
    rating: 4.7,
    isPopular: true,
    category: "Specialty"
  }
];

export function MenuPreview() {
  const [selectedPizza, setSelectedPizza] = useState<typeof featuredPizzas[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCustomize = (pizza: typeof featuredPizzas[0]) => {
    setSelectedPizza(pizza);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPizza(null);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Featured</span> Pizzas
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handcrafted with love using the finest ingredients and traditional Italian techniques
          </p>
        </div>

        {/* Pizza Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredPizzas.map((pizza) => (
            <Card key={pizza.id} className="card-hover bg-card border-border overflow-hidden group">
              {/* Pizza Image */}
              <div className="relative h-64 bg-gradient-card overflow-hidden">
                <img 
                  src={pizza.image} 
                  alt={pizza.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {pizza.isPopular && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    Popular
                  </Badge>
                )}
              </div>

              {/* Pizza Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {pizza.category}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{pizza.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2">{pizza.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {pizza.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    ${pizza.price}
                  </span>
                  <Button 
                    size="sm" 
                    className="btn-primary"
                    onClick={() => handleCustomize(pizza)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Customize
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View Full Menu CTA */}
        <div className="text-center">
          <Link to="/menu">
            <Button size="lg" className="btn-primary">
              View Full Menu
            </Button>
          </Link>
        </div>
      </div>

      <PizzaCustomizationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        pizza={selectedPizza}
      />
    </section>
  );
}