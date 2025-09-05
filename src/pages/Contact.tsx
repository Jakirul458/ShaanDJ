import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You would integrate with your backend/email service here
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      detail: "jakirulsk312@gmail.com",
      color: "text-primary"
    },
    {
      icon: Phone,
      title: "Phone",
      detail: "+91 9999999999",
      color: "text-secondary"
    },
    {
      icon: MapPin,
      title: "Location",
      detail: "Kolkata, India",
      color: "text-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">Get In</span>{" "}
              <span className="text-neon animate-glow">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a question, suggestion, or want to collaborate? We'd love to hear from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="bg-card/30 backdrop-blur-sm border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <MessageCircle className="h-8 w-8 text-primary glow" />
                  <h2 className="text-2xl font-bold text-foreground">Send us a message</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="bg-input border-border focus:border-primary transition-colors duration-300"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="bg-input border-border focus:border-primary transition-colors duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      className="bg-input border-border focus:border-primary transition-colors duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      className="bg-input border-border focus:border-primary transition-colors duration-300 resize-none"
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 animate-pulse-glow"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="bg-card/30 backdrop-blur-sm border-primary/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-8">Contact Information</h2>
                  
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon;
                      return (
                        <div 
                          key={index}
                          className="flex items-start space-x-4 animate-float"
                          style={{ animationDelay: `${index * 0.2}s` }}
                        >
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center ${info.color} glow`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                            <p className="text-muted-foreground">{info.detail}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Quick Links</h2>
                  
                  <div className="space-y-4">
                    <a 
                      href="#" 
                      className="block p-4 bg-card/30 rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                          <span className="text-red-500 text-lg">▶</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">YouTube Channel</h3>
                          <p className="text-sm text-muted-foreground">Subscribe for latest videos</p>
                        </div>
                      </div>
                    </a>

                    <a 
                      href="#" 
                      className="block p-4 bg-card/30 rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
                          <span className="text-pink-500 text-lg">📷</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">Instagram</h3>
                          <p className="text-sm text-muted-foreground">Follow for behind-the-scenes</p>
                        </div>
                      </div>
                    </a>

                    <a 
                      href="#" 
                      className="block p-4 bg-card/30 rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <span className="text-blue-500 text-lg">f</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">Facebook</h3>
                          <p className="text-sm text-muted-foreground">Join our community</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Note */}
              <Card className="bg-card/30 backdrop-blur-sm border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">Frequently Asked Questions</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Before reaching out, you might find answers to common questions in our FAQ section.
                  </p>
                  <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                    View FAQ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Response Time Notice */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto bg-muted/20 border-border">
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Response Time:</strong> We typically respond to all inquiries within 24-48 hours. 
                  For urgent matters, please mention "URGENT" in your subject line.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;