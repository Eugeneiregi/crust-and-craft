import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Award, Users, Heart } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Clock,
      title: "39 Years of Excellence",
      description: "Serving authentic Italian pizza since 1985 with traditional recipes passed down through generations."
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized as the #1 Pizza Restaurant in the city for three consecutive years."
    },
    {
      icon: Users,
      title: "Family Owned",
      description: "A proud family business that treats every customer like family with personalized service."
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every pizza is crafted with passion using only the finest, freshest ingredients."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">About PizzaCraft</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            The story of passion, tradition, and the perfect slice
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Our Story</Badge>
              <h2 className="text-4xl font-bold mb-6">
                From Naples to <span className="gradient-text">Your Neighborhood</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Founded in 1985 by Giuseppe and Maria Rossi, PizzaCraft began as a small family restaurant 
                with a simple mission: to bring authentic Neapolitan pizza to our community. Using recipes 
                passed down through four generations, we've maintained the same commitment to quality and 
                tradition that made us who we are today.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every pizza that leaves our kitchen is a testament to our dedication to excellence. 
                We hand-select our ingredients, age our dough for 48 hours, and fire our pizzas in 
                traditional wood-burning ovens imported directly from Italy.
              </p>
            </div>
            <div className="text-center">
              <div className="text-9xl mb-4 animate-float">🍕</div>
              <p className="text-muted-foreground italic">
                "La pizza è una forma d'arte" - Pizza is an art form
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose PizzaCraft?</h2>
            <p className="text-xl text-muted-foreground">
              Experience the difference that passion and quality make
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center card-hover">
                <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold mb-3">Quality First</h3>
              <p className="text-muted-foreground">
                We never compromise on the quality of our ingredients or the craftsmanship of our pizzas.
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold mb-3">Community</h3>
              <p className="text-muted-foreground">
                We're more than a restaurant - we're part of the community, supporting local causes and events.
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold mb-3">Sustainability</h3>
              <p className="text-muted-foreground">
                We source locally when possible and use eco-friendly packaging to protect our environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}