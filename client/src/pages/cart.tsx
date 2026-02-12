import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type { CartItem, Product } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Trash2, ShoppingCart, ArrowLeft, ArrowRight, Minus, Plus, Package } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

type CartItemWithProduct = CartItem & { product: Product };

export default function Cart() {
  const { toast } = useToast();

  useSEO({
    title: "Warenkorb",
    description: "Ihr Warenkorb bei Limepack - Bedruckte Verpackungen bestellen.",
  });

  const { data: cartItems, isLoading } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart"],
  });

  const updateQuantity = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      await apiRequest("PATCH", `/api/cart/${id}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const removeItem = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({ title: "Artikel entfernt" });
    },
  });

  const total = cartItems?.reduce((sum, item) => {
    const price = parseFloat(item.product?.basePrice || "0");
    return sum + price * item.quantity;
  }, 0) || 0;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex gap-4">
                <Skeleton className="w-24 h-24 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center" data-testid="page-cart-empty">
        <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-3" data-testid="text-cart-empty">
          Ihr Warenkorb ist leer
        </h2>
        <p className="text-muted-foreground mb-6">
          Entdecken Sie unsere individuell bedruckten Verpackungen.
        </p>
        <Link href="/produkte">
          <Button data-testid="button-shop-now">
            <Package className="w-4 h-4 mr-2" />
            Jetzt einkaufen
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" data-testid="page-cart">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-cart-title">
          Warenkorb ({cartItems.length} Artikel)
        </h1>
        <Link href="/produkte">
          <Button variant="ghost" size="sm" data-testid="button-continue-shopping">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Weiter einkaufen
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="p-4" data-testid={`card-cart-item-${item.id}`}>
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-md overflow-hidden bg-muted/30 shrink-0">
                  <img
                    src={item.product?.imageUrl || ""}
                    alt={item.product?.name || ""}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/produkt/${item.product?.slug}`}>
                        <h3 className="font-semibold hover:text-primary transition-colors line-clamp-1">
                          {item.product?.name}
                        </h3>
                      </Link>
                      {item.size && (
                        <p className="text-sm text-muted-foreground">Groesse: {item.size}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem.mutate(item.id)}
                      disabled={removeItem.isPending}
                      data-testid={`button-remove-${item.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity.mutate({
                            id: item.id,
                            quantity: Math.max(item.product?.minQuantity || 1, item.quantity - (item.product?.minQuantity || 100)),
                          })
                        }
                        disabled={item.quantity <= (item.product?.minQuantity || 1)}
                        data-testid={`button-cart-minus-${item.id}`}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm font-medium w-16 text-center" data-testid={`text-qty-${item.id}`}>
                        {item.quantity} St.
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity.mutate({
                            id: item.id,
                            quantity: item.quantity + (item.product?.minQuantity || 100),
                          })
                        }
                        data-testid={`button-cart-plus-${item.id}`}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <span className="font-semibold text-primary" data-testid={`text-item-total-${item.id}`}>
                      CHF {(parseFloat(item.product?.basePrice || "0") * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div>
          <Card className="p-6 sticky top-24" data-testid="card-order-summary">
            <h3 className="font-semibold mb-4">Bestelluebersicht</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Zwischensumme</span>
                <span>CHF {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Versand</span>
                <span className="text-primary font-medium">Kostenlos</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between gap-2 font-semibold">
              <span>Gesamt</span>
              <span className="text-primary" data-testid="text-cart-total">CHF {total.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-6" size="lg" data-testid="button-checkout">
              Zur Kasse
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Inkl. MwSt. Kostenloser Versand in die Schweiz.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
