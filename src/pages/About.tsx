import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Award, Users, Heart } from "lucide-react";

const About = () => {
  const achievements = [
    {
      icon: Music,
      title: "1000+ Songs",
      description: "Created amazing mashups",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "50K+ Followers",
      description: "Growing community",
      color: "text-secondary"
    },
    {
      icon: Award,
      title: "4+ Languages",
      description: "Musical diversity",
      color: "text-accent"
    },
    {
      icon: Heart,
      title: "Music Passion",
      description: "Spreading joy through music",
      color: "text-neon-pink"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">About</span>{" "}
              <span className="text-neon animate-glow">VDJ Shaan</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate music creator bringing you the best mashups across multiple languages
            </p>
          </div>

          {/* Main Story */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="bg-card/30 backdrop-blur-sm border-primary/20">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6 text-lg leading-relaxed">
                  <p className="text-foreground">
                    Welcome to the world of <span className="text-primary font-semibold">VDJ Shaan</span>, 
                    where music transcends boundaries and cultures unite through rhythm and melody. 
                    I am a passionate music creator dedicated to bringing you the most amazing mashup 
                    experiences across multiple languages.
                  </p>
                  
                  <p className="text-muted-foreground">
                    My journey began with a simple belief: <span className="text-secondary font-medium">
                    "Your mood - my songs"</span>. This philosophy drives everything I create. 
                    Whether you're feeling nostalgic, energetic, romantic, or adventurous, 
                    there's always a perfect mashup waiting for you in my collection.
                  </p>
                  
                  <p className="text-muted-foreground">
                    Specializing in <span className="text-accent font-medium">Bengali, Hindi, English, and Bhojpuri</span> mashups, 
                    I carefully craft each track to honor the original compositions while adding 
                    a fresh, contemporary twist. My goal is to create musical experiences that 
                    resonate with listeners from different backgrounds and generations.
                  </p>
                  
                  <p className="text-muted-foreground">
                    What sets my work apart is the seamless blend of traditional melodies with 
                    modern production techniques. Each mashup tells a story, evokes emotions, 
                    and creates connections between different musical cultures. I believe that 
                    music is a universal language that can bring people together.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card
                  key={index}
                  className="text-center border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-float"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 mb-4 ${achievement.color} glow`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2 text-foreground">
                      {achievement.title}
                    </h3>
                    
                    <p className="text-muted-foreground">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-primary">My Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To create exceptional mashup experiences that bridge cultural gaps and 
                  bring joy to music lovers worldwide. I strive to honor the essence of 
                  original compositions while innovating with contemporary sounds and production techniques.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/30">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-secondary">My Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To build a global community of music enthusiasts who appreciate the 
                  beauty of cultural fusion in music. I envision a world where different 
                  musical traditions come together to create something beautiful and unique.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Creative Process */}
          <Card className="bg-card/30 backdrop-blur-sm border-primary/20 mb-16">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
                My Creative Process
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 glow">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Selection</h3>
                  <p className="text-muted-foreground">
                    Carefully choosing songs that complement each other across different languages and genres
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-purple">
                    <span className="text-2xl font-bold text-secondary">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Creation</h3>
                  <p className="text-muted-foreground">
                    Blending melodies, rhythms, and vocals using professional mixing and mastering techniques
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-yellow">
                    <span className="text-2xl font-bold text-accent">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Perfection</h3>
                  <p className="text-muted-foreground">
                    Fine-tuning every detail to ensure the final mashup delivers an amazing listening experience
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border-primary/30">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  Join the Musical Journey
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Be part of this amazing musical adventure. Subscribe to stay updated with 
                  the latest mashups and exclusive content.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 glow text-lg">
                    Subscribe Now
                  </button>
                  <button className="px-8 py-4 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors duration-300 text-lg">
                    Contact Me
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;