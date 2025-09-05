import { Card, CardContent } from "@/components/ui/card";
import { Music2, Heart, Globe, Headphones } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Bengali Mashup Songs",
      description: "Soulful Bengali melodies mixed with modern beats",
      icon: Music2,
      gradient: "from-primary to-primary/50",
      glow: "glow",
    },
    {
      title: "Hindi Mashup Songs", 
      description: "Bollywood classics with contemporary twists",
      icon: Heart,
      gradient: "from-secondary to-secondary/50",
      glow: "glow-purple",
    },
    {
      title: "English Mashup Songs",
      description: "International hits reimagined and remixed",
      icon: Globe,
      gradient: "from-accent to-accent/50",
      glow: "glow-yellow",
    },
    {
      title: "Bhojpuri Mashup Songs",
      description: "Traditional Bhojpuri music with modern production",
      icon: Headphones,
      gradient: "from-neon-blue to-neon-pink",
      glow: "glow",
    },
  ];

  return (
    <section className="py-24 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-neon animate-glow">Musical</span>{" "}
            <span className="text-foreground">Diversity</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the perfect blend of traditional and modern music across multiple languages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="group border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:scale-105 animate-float"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8 text-center">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center ${feature.glow} group-hover:animate-pulse-glow transition-all duration-300`}>
                    <Icon className="h-8 w-8 text-background" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Animated line */}
                  <div className="w-0 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 group-hover:w-full transition-all duration-500"></div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;