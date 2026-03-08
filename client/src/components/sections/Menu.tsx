import { motion } from "framer-motion";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/context/CartContext";
import { Coffee, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Menu() {
  const { data: products, isLoading, isError } = useProducts();
  const { addItem } = useCart();
  const { toast } = useToast();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="menu" className="py-24 lg:py-32 bg-secondary/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-medium tracking-widest uppercase mb-4 block">
            Discover
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Our Signature Menu
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            Carefully curated selections crafted to awaken your senses.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-lg p-6 border border-border/50 shadow-sm animate-pulse">
                <div className="w-full h-48 bg-muted rounded-md mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3 mb-6"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-muted rounded w-1/4"></div>
                  <div className="h-10 bg-muted rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : isError || !products || products.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-border border-dashed">
            <Coffee className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-display font-medium text-foreground mb-2">Menu Updating</h3>
            <p className="text-muted-foreground">Our baristas are crafting new seasonal specials. Please check back soon.</p>
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <motion.div 
                key={product.id} 
                variants={item}
                className="group flex flex-col bg-card rounded-xl border border-border/60 shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-60 overflow-hidden bg-muted">
                  <img
                    src={product.imageUrl || "https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&q=80&w=800"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-foreground">
                    {product.category}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-display font-bold text-foreground pr-4">
                      {product.name}
                    </h3>
                    <span className="text-lg font-semibold text-accent whitespace-nowrap">
                      ${Number(product.price).toFixed(2)}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm flex-1 font-light leading-relaxed mb-6">
                    {product.description}
                  </p>
                  
                  <button 
                    onClick={() => {
                      addItem(product);
                      toast({
                        title: "Added to Order",
                        description: `${product.name} has been added to your order.`,
                      });
                    }}
                    className="w-full py-3 bg-secondary/50 text-foreground font-medium rounded-md hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    data-testid={`button-add-to-order-${product.id}`}
                  >
                    Add to Order
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
