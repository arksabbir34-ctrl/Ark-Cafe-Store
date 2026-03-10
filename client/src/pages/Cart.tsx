import { useCart } from "@/context/CartContext";
import { useLocation } from "wouter";
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-6"
            data-testid="button-back-to-home"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">
            Your Order
          </h1>
          <p className="text-muted-foreground">Review and manage your selections</p>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl border border-border/60 shadow-sm p-12 text-center"
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Start by adding some delicious items from our menu
            </p>
            <button
              onClick={() => setLocation("/")}
              className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
              data-testid="button-continue-shopping"
            >
              Continue Shopping
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border border-border/60 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border/50">
                  <h2 className="text-xl font-display font-bold text-foreground">
                    Items ({items.reduce((sum, item) => sum + item.quantity, 0)})
                  </h2>
                </div>

                <div className="divide-y divide-border/50">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-6 flex gap-4 hover:bg-secondary/30 transition-colors"
                    >
                      {/* Product Image */}
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&q=80&w=100";
                        }}
                      />

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-display font-bold text-foreground mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.category}
                        </p>
                        <p className="text-lg font-semibold text-accent">
                          ${Number(item.price).toFixed(2)} each
                        </p>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 hover:bg-destructive/20 rounded-md transition-colors text-destructive"
                          data-testid={`button-remove-item-${item.id}`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>

                        <div className="flex items-center gap-2 bg-secondary/50 rounded-md">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                            className="p-2 hover:bg-secondary transition-colors"
                            data-testid={`button-decrease-qty-${item.id}`}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-semibold text-foreground" data-testid={`text-qty-${item.id}`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-secondary transition-colors"
                            data-testid={`button-increase-qty-${item.id}`}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <p className="text-lg font-bold text-foreground">
                          ${(Number(item.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border/60 shadow-sm p-6 sticky top-24">
                <h3 className="text-xl font-display font-bold text-foreground mb-6">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-6 pb-6 border-b border-border/50">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal:</span>
                    <span data-testid="text-subtotal">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Tax (10%):</span>
                    <span data-testid="text-tax">${(total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Delivery:</span>
                    <span data-testid="text-delivery">$3.50</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8 text-lg font-bold text-foreground">
                  <span>Total:</span>
                  <span data-testid="text-total">${(total + total * 0.1 + 3.5).toFixed(2)}</span>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setLocation("/checkout")}
                    className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
                    data-testid="button-checkout"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => setLocation("/")}
                    className="w-full py-3 bg-secondary/50 text-foreground font-medium rounded-md hover:bg-secondary transition-colors"
                    data-testid="button-continue-shopping-summary"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full py-3 bg-destructive/20 text-destructive font-medium rounded-md hover:bg-destructive/30 transition-colors"
                    data-testid="button-clear-cart"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
