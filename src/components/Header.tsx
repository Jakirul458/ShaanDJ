import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Albums", path: "/albums" },
    { name: "Events", path: "/events" },
      { name: "Gallery", path: "/gallery" },
    { name: "Videos", path: "/videos" },
    { name: "About", path: "/about" },
    { name: "Audio", path: "/audio" },
    { name: "Contact", path: "/contact" },
    { name: "Purchases", path: "/purchases" },
    { name: "Login", path: "/login" },
    { name: "Admin", path: "/admin" },
  
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/logo.svg"
              alt="VDJ Shana Logo"
              className="h-16 w-16 object-contain"
            />
            <span className="text-3xl font-bold text-neon animate-glow hover:scale-105 transition-transform duration-300">
              VDJ Shaan
            </span>
          </Link>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${isActive(item.path)
                    ? "text-primary glow"
                    : "text-muted-foreground"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border border-border rounded-lg mt-2 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block py-2 px-3 rounded-md text-sm font-medium transition-colors duration-300 ${isActive(item.path)
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
