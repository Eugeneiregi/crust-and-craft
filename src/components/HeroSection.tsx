import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-pizza.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Delicious Pizza"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto animate-slide-up">
          {/* Rating Badge */}
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="ml-2 text-sm font-medium">4.9 • 2,500+ Reviews</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Authentic Italian
            <br />
            <span className="text-secondary animate-glow">Pizza Delivered</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Fresh ingredients, hand-tossed dough, and wood-fired perfection. 
            Experience the taste of Italy in every bite.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/menu">
              <Button
                size="lg"
                className="btn-primary group text-lg px-8 py-4"
              >
                Order Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/menu">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-4"
              >
                View Menu
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">30+</div>
              <div className="text-sm text-white/80">Pizza Varieties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">20min</div>
              <div className="text-sm text-white/80">Avg Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">5★</div>
              <div className="text-sm text-white/80">Customer Rating</div>
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