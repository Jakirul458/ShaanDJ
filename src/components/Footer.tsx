import React from "react";
import { Link } from "react-router-dom";
import { Music, Youtube, Instagram, Facebook, Twitter } from "lucide-react";
import { FaSpotify, FaAmazon, FaMusic, FaBolt } from "react-icons/fa";

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

const footerLinks: Record<string, FooterLink[]> = {
  "Quick Links": [
    { name: "Home", href: "/" },
    { name: "Videos", href: "/videos" },
    { name: "About", href: "/about" },
    { name: "Audio", href: "/audio" },
    { name: "Albums", href: "/albums" },
   
  ],
  Legal: [
    { name: "Terms and Conditions", href: "/terms-of-service" },
    { name: "Privacy Policy", href: "/privacy-policy"},
    { name: "Copyright", href: "#" },
    { name: "Licensing", href: "#" },
  ],
  Support: [
    { name: "Help Center", href: "/contact" },
    { name: "Community", href: "#" },
    { name: "Feedback", href: "#" },
    { name: "Report Issue", href: "#" },
  ],
 
};

const socialLinks = [
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/@vdjshanaofficial", color: "hover:text-red-500" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/_alan_jacky_", color: "hover:text-pink-500" },
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/share/1CZrWf4pcy/", color: "hover:text-blue-500" },
  { name: "Twitter", icon: Twitter, href: "https://x.com/JakirulSk60351", color: "hover:text-blue-400" },
  { name: "Spotify", icon: FaSpotify, href: "https://open.spotify.com/artist/1AElbGTdtp3Uly2j6U4JpX", color: "hover:text-green-500" },
  { name: "Amazon Music", icon: FaAmazon, href: "https://music.amazon.com/artists/B09WB5RTJY/vdj-shana", color: "hover:text-indigo-500" },
  { name: "Resso", icon: FaMusic, href: "https://m.resso.com/ZSdnuQxyo", color: "hover:text-pink-600" },
  { name: "Shazam", icon: FaBolt, href: "https://www.shazam.com/amp/track/619347994/let-me-down-x-rendu-kaadhal-lofi-mix", color: "hover:text-blue-600" },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-primary/20 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center glow">
                <Music className="h-6 w-6 text-background" />
              </div>
              <div className="text-2xl font-bold text-neon animate-glow">vdj Shaan</div>
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Creating amazing mashup experiences across multiple languages.
              Your mood, my songs - bringing you the perfect blend of traditional and modern music.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110 hover:glow`}
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-foreground mb-6">{category}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-primary/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Stay updated with our latest releases
              </h3>
              <p className="text-muted-foreground">
                Get notified when we drop new mashups and exclusive content
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-w-[300px]"
              />
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 glow whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} vdj Shaan &nbsp;&nbsp;&nbsp;All rights reserved.</p>
            <p className="text-gray-300">
              Developed by{" "}
              <a
                href="https://jakirulsk.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 transition-colors font-medium"
              >
                Jakirul Sk
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
