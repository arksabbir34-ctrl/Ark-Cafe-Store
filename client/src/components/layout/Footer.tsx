import { Coffee, Instagram, Twitter, Facebook } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t-4 border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group inline-flex">
              <Coffee className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold tracking-widest font-display uppercase text-white">
                Ark Cafe & Bakehouse
              </span>
            </Link>
            <p className="text-primary-foreground/70 font-light max-w-sm leading-relaxed mb-6">
              Elevating the coffee experience through sustainable sourcing, master roasting, and passionate brewing. 
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-white tracking-wide">Quick Links</h4>
            <ul className="space-y-3 font-light text-primary-foreground/70">
              <li><a href="#about" className="hover:text-accent transition-colors">Our Story</a></li>
              <li><a href="#menu" className="hover:text-accent transition-colors">Menu</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-white tracking-wide">Opening Hours</h4>
            <ul className="space-y-3 font-light text-primary-foreground/70">
              <li className="flex justify-between"><span>Mon - Fri:</span> <span>7am - 8pm</span></li>
              <li className="flex justify-between"><span>Saturday:</span> <span>8am - 9pm</span></li>
              <li className="flex justify-between"><span>Sunday:</span> <span>8am - 6pm</span></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-primary-foreground/50 text-sm font-light">
          <p>&copy; {new Date().getFullYear()} Ark Cafe & Bakehouse. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
