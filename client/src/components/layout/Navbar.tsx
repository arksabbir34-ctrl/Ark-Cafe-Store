import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Coffee, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Our Story", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-nav py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Coffee className={`h-8 w-8 transition-colors ${isScrolled ? "text-primary" : "text-white group-hover:text-accent"}`} />
            <span className={`text-2xl font-bold tracking-widest font-display uppercase ${isScrolled ? "text-foreground" : "text-white"}`}>
              ARK Cafe
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-accent ${
                  isScrolled ? "text-foreground/80" : "text-white/90"
                }`}
              >
                {link.name}
              </a>
            ))}
            <Link href="/cart" className="relative group">
              <ShoppingCart className={`h-6 w-6 cursor-pointer transition-colors ${isScrolled ? "text-foreground" : "text-white"} hover:text-accent`} data-testid="icon-shopping-cart" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center" data-testid="text-cart-count">
                  {itemCount}
                </span>
              )}
            </Link>
            <a
              href="#menu"
              className={`px-6 py-2.5 rounded-sm font-medium tracking-wider text-sm transition-all duration-300 ${
                isScrolled
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg"
                  : "bg-white text-primary hover:bg-white/90"
              }`}
              data-testid="button-order-now"
            >
              Order Now
            </a>
          </nav>

          {/* Mobile Menu Toggle & Cart */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/cart" className="relative group">
              <ShoppingCart className={`h-6 w-6 cursor-pointer transition-colors ${isScrolled ? "text-foreground" : "text-white"} hover:text-accent`} data-testid="icon-shopping-cart-mobile" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center" data-testid="text-cart-count-mobile">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              data-testid="button-mobile-menu-toggle"
            >
              {mobileMenuOpen ? (
                <X className={isScrolled ? "text-foreground" : "text-white"} />
              ) : (
                <Menu className={isScrolled ? "text-foreground" : "text-white"} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-b border-border shadow-xl md:hidden"
          >
            <div className="flex flex-col px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-foreground py-2 border-b border-border/50"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 w-full text-center bg-primary text-primary-foreground py-3 rounded-sm font-medium"
              >
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
