import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Star, Filter } from "lucide-react";

const menuItems = {
  classic: [
    {
      id: 1,
      name: "Margherita",
      description: "Fresh mozzarella, tomato sauce, basil, olive oil",
      price: 16.99,
      image: "🍕",
      rating: 4.8,
      isVegetarian: true
    },
    {
      id: 2,
      name: "Pepperoni",
      description: "Premium pepperoni, mozzarella, tomato sauce",
      price: 19.99,
      image: "🍕",
      rating: 4.9,
      isVegetarian: false
    },
    {
      id: 3,
      name: "Hawaiian",
      description: "Ham, pineapple, mozzarella, tomato sauce",
      price: 21.99,
      image: "🍕",
      rating: 4.5,
      isVegetarian: false
    }
  ],
  vegetarian: [
    {
      id: 4,
      name: "Veggie Supreme",
      description: "Bell peppers, mushrooms, onions, olives, tomatoes",
      price: 18.99,
      image: "🍕",
      rating: 4.6,
      isVegetarian: true
    },
    {
      id: 5,
      name: "Mediterranean",
      description: "Feta cheese, olives, sun-dried tomatoes, spinach",
      price: 20.99,
      image: "🍕",
      rating: 4.7,
      isVegetarian: true
    }
  ],
  specialty: [
    {
      id: 6,
      name: "Meat Lovers",
      description: "Pepperoni, sausage, ham, bacon, ground beef",
      price: 24.99,
      image: "🍕",
      rating: 4.7,
      isVegetarian: false
    },
    {
      id: 7,
      name: "BBQ Chicken",
      description: "Grilled chicken, BBQ sauce, red onions, cilantro",
      price: 22.99,
      image: "🍕",
      rating: 4.8,
      isVegetarian: false
    },
    {
      id: 8,
      name: "White Truffle",
      description: "Truffle oil, ricotta, mozzarella, arugula",
      price: 28.99,
      image: "🍕",
      rating: 4.9,
      isVegetarian: true
    }
  ]
};

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("classic");

  const renderPizzaCard = (pizza: any) => (
    <Card key={pizza.id} className="card-hover overflow-hidden group">
      <div className="relative p-6 bg-gradient-card">
        <div className="text-6xl text-center animate-float group-hover:scale-110 transition-transform duration-300">
          {pizza.image}
        </div>
        {pizza.isVegetarian && (
          <Badge className="absolute top-4 right-4 bg-success text-success-foreground">
            Vegetarian
          </Badge>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
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
          <Button className="btn-primary">
            <Plus className="h-4 w-4 mr-1" />
            Customize
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Menu Header */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Our Menu</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover our handcrafted pizzas made with the finest ingredients
          </p>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 max-w-md mx-auto">
              <TabsTrigger value="classic">Classic</TabsTrigger>
              <TabsTrigger value="vegetarian">Vegetarian</TabsTrigger>
              <TabsTrigger value="specialty">Specialty</TabsTrigger>
            </TabsList>
            
            <TabsContent value="classic">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menuItems.classic.map(renderPizzaCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="vegetarian">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menuItems.vegetarian.map(renderPizzaCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="specialty">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menuItems.specialty.map(renderPizzaCard)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}