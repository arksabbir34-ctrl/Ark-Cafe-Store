import { useCart } from "@/context/CartContext";
import { useLocation } from "wouter";
import { ArrowLeft, CheckCircle, Phone, MapPin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  address: z.string().min(5, "Address required"),
  city: z.string().min(2, "City required"),
  zipCode: z.string().min(5, "ZIP code required"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (data: CheckoutForm) => {
    console.log("Order submitted:", { ...data, items, total });
    setSubmitted(true);
    setTimeout(() => {
      clearCart();
      setLocation("/");
    }, 3000);
  };

  if (!items.length && !submitted) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setLocation("/cart")}
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-6"
            data-testid="button-back-to-cart"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Cart
          </button>
          <div className="bg-card rounded-xl border border-border/60 shadow-sm p-12 text-center">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Your cart is empty
            </h2>
            <button
              onClick={() => setLocation("/")}
              className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
              data-testid="button-back-to-menu"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-xl border border-border/60 shadow-sm p-12 text-center max-w-md"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">
            Order Confirmed!
          </h2>
          <p className="text-muted-foreground mb-8">
            Thank you for your order. We're preparing your coffee with care.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Redirecting to home in a moment...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setLocation("/cart")}
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-6"
            data-testid="button-back-to-cart"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Cart
          </button>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">
            Checkout
          </h1>
          <p className="text-muted-foreground">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl border border-border/60 shadow-sm p-8 space-y-6"
            >
              <div>
                <h2 className="text-xl font-display font-bold text-foreground mb-6">
                  Delivery Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <input
                    {...register("firstName")}
                    type="text"
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    data-testid="input-first-name"
                  />
                  {errors.firstName && (
                    <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <input
                    {...register("lastName")}
                    type="text"
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    data-testid="input-last-name"
                  />
                  {errors.lastName && (
                    <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    data-testid="input-email"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    data-testid="input-phone"
                  />
                  {errors.phone && (
                    <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Address
                </label>
                <input
                  {...register("address")}
                  type="text"
                  className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  data-testid="input-address"
                />
                {errors.address && (
                  <p className="text-destructive text-sm mt-1">{errors.address.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    City
                  </label>
                  <input
                    {...register("city")}
                    type="text"
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    data-testid="input-city"
                  />
                  {errors.city && (
                    <p className="text-destructive text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    ZIP Code
                  </label>
                  <input
                    {...register("zipCode")}
                    type="text"
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    data-testid="input-zip-code"
                  />
                  {errors.zipCode && (
                    <p className="text-destructive text-sm mt-1">{errors.zipCode.message}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors mt-8"
                data-testid="button-place-order"
              >
                Place Order
              </button>
            </motion.form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border/60 shadow-sm p-6 sticky top-24">
              <h3 className="text-xl font-display font-bold text-foreground mb-6">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-border/50 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="text-foreground font-medium">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

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

              <div className="flex justify-between items-center text-lg font-bold text-foreground">
                <span>Total:</span>
                <span data-testid="text-total">${(total + total * 0.1 + 3.5).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
