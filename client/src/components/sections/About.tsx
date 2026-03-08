import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-2xl">
              {/* about section pouring latte art */}
              <img
                src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=1000"
                alt="Barista pouring latte art"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative badge */}
            <div className="absolute -bottom-8 -right-8 bg-primary text-primary-foreground p-8 rounded-full h-40 w-40 flex items-center justify-center border-8 border-background shadow-xl">
              <div className="text-center">
                <span className="block text-3xl font-display font-bold">100%</span>
                <span className="block text-xs uppercase tracking-wider mt-1 text-primary-foreground/80">Organic</span>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <span className="text-accent font-medium tracking-widest uppercase mb-4 block">
              Our Heritage
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 text-balance">
              Where Every Bean Tells a Story.
            </h2>
            
            <div className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed">
              <p>
                Founded by Abdur Rahim Khan, ARK Cafe Store is more than just a destination for coffee—it is an homage to the timeless tradition of brewing perfection.
              </p>
              <p>
                We source our beans directly from sustainable farms across the globe, ensuring that every cup not only delivers an exceptional flavor profile but also supports the communities that cultivate them.
              </p>
              <p>
                Step into our haven and let the rich aroma of roasted coffee guide you through a sensory journey unlike any other.
              </p>
            </div>

            <div className="mt-10 pt-10 border-t border-border/60">
              <p className="font-display text-2xl italic text-foreground">
                "Coffee is a language in itself."
              </p>
              <p className="mt-2 text-sm font-semibold tracking-widest uppercase text-muted-foreground">
                — Abdur Rahim Khan
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
