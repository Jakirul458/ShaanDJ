import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Headphones, Users, Heart } from "lucide-react";

const About = () => {
  const achievements = [
    {
      icon: Music,
      title: "1000+ Tracks",
      description: "Produced amazing mashups & remixes",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "50K+ Fans",
      description: "Growing global community",
      color: "text-secondary"
    },
    {
      icon: Headphones,
      title: "Live Shows",
      description: "Performed at top venues & festivals",
      color: "text-accent"
    },
    {
      icon: Heart,
      title: "Music Passion",
      description: "Sharing vibes that move people",
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
              <span className="text-foreground">Meet</span>{" "}
              <span className="text-neon animate-glow">DJ Shaan</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Spinning beats, creating mashups, and delivering unforgettable experiences worldwide.
            </p>
          </div>

          {/* Story / DJ Journey */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="bg-card/30 backdrop-blur-sm border-primary/20">
              <CardContent className="p-8 md:p-12 space-y-6 text-lg leading-relaxed">
                <p className="text-foreground">
                  I'm <span className="text-primary font-semibold">DJ Shaan</span>, a passionate DJ and music producer dedicated to blending rhythms and cultures into unforgettable mashups. My goal is simple: make people feel the music and connect through beats.
                </p>
                <p className="text-muted-foreground">
                  From local gigs to international festivals, I’ve performed live for thousands of fans, creating energy, excitement, and memories that last forever.
                </p>
                <p className="text-muted-foreground">
                  My style spans multiple genres and languages, always keeping the crowd engaged and the vibes high. I mix Bengali, Hindi, English, and Bhojpuri tracks with a unique, signature twist.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Achievements / Stats */}
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
                    <h3 className="text-2xl font-bold mb-2 text-foreground">{achievement.title}</h3>
                    <p className="text-muted-foreground">{achievement.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* DJ Philosophy & Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-primary">My Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To create live musical experiences that energize the crowd and bring people together through music. I aim to innovate mashups while honoring original compositions and keeping the dance floor alive.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/30">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-secondary">My Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To become a recognized DJ and producer globally, known for high-energy performances, creative mashups, and a loyal fanbase who share a love for diverse musical experiences.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Creative Process */}
          <Card className="bg-card/30 backdrop-blur-sm border-primary/20 mb-16">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-8 text-center text-foreground">How I Create</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 glow">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Track Selection</h3>
                  <p className="text-muted-foreground">Carefully choosing songs that complement each other for an amazing vibe.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-purple">
                    <span className="text-2xl font-bold text-secondary">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Mixing & Mashup</h3>
                  <p className="text-muted-foreground">Blending melodies, beats, and vocals with professional techniques for seamless tracks.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-yellow">
                    <span className="text-2xl font-bold text-accent">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Live Energy</h3>
                  <p className="text-muted-foreground">Fine-tuning performances to ensure every audience leaves energized and happy.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center mb-16">
            <Card className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border-primary/30">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-6 text-foreground">Join the Vibe</h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Be part of my music journey! Subscribe to get new mashups, live updates, and exclusive behind-the-scenes content.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 glow text-lg">
                    Subscribe Now
                  </button>
                  <button className="px-8 py-4 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors duration-300 text-lg">
                    Book Me
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
