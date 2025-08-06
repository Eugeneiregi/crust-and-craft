import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-pizza.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Rating Badge */}
            <div className="inline-flex items-center bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 border border-primary/20">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="ml-3 text-sm font-medium text-foreground">4.9 • 2,500+ Reviews</span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-6xl lg:text-8xl font-bold mb-4 leading-none">
                <span className="text-primary/20 block text-4xl lg:text-6xl font-normal mb-2">AUTHENTIC</span>
                <span className="block">PIZZA</span>
                <span className="text-primary block">DELIVERY</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Fresh ingredients, hand-tossed dough, and wood-fired perfection. 
              Experience the taste of Italy delivered to your door in under 30 minutes.
            </p>

            {/* Price Display */}
            <div className="bg-card rounded-xl p-6 border border-border max-w-sm">
              <div className="text-sm text-muted-foreground mb-2">Starting from</div>
              <div className="text-4xl font-bold text-primary mb-4">$16.99</div>
              
              {/* CTA Button */}
              <Link to="/menu">
                <Button
                  size="lg"
                  className="btn-primary group w-full text-lg py-6"
                >
                  Order Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">30+</div>
                <div className="text-xs text-muted-foreground">Varieties</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">20min</div>
                <div className="text-xs text-muted-foreground">Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5★</div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Pizza */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main Pizza Image */}
              <div className="relative z-10">
                <img
                  src={heroImage}
                  alt="Delicious Pizza"
                  className="w-full max-w-lg h-auto drop-shadow-2xl animate-float"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-semibold animate-pulse">
                Fresh Today!
              </div>
              
              {/* Small Pizza Thumbnails */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-2xl animate-float" style={{ animationDelay: '0.5s' }}>
                  🍕
                </div>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-2xl animate-float" style={{ animationDelay: '1s' }}>
                  🍕
                </div>
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-2xl animate-float" style={{ animationDelay: '1.5s' }}>
                  🍕
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating pizza decoration */}
      <div className="absolute top-20 right-10 text-6xl animate-float hidden lg:block opacity-20">
        🍕
      </div>
      <div className="absolute bottom-20 left-10 text-4xl animate-float hidden lg:block opacity-20" style={{ animationDelay: '1s' }}>
        🍕
      </div>
    </section>
  );
}