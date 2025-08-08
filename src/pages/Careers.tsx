import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="flex justify-center">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <Construction className="h-16 w-16 mx-auto text-primary mb-4" />
              <CardTitle className="text-2xl">Page Under Construction</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Our Careers page is currently being worked on. Check back soon for updates!
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;