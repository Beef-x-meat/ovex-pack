import { useParams, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import type { Product, Category } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Recycle,
  ShoppingCart,
  ArrowLeft,
  Truck,
  Palette,
  Shield,
  Minus,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { useSEO } from "@/hooks/use-seo";
import { ProductConfigurator3D } from "@/components/product-configurator-3d";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(100);
  const [selectedSize, setSelectedSize] = useState("");

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", slug],
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  useSEO({
    title: product?.name || "Produkt",
    description: product?.shortDescription || "Individuell bedruckte Verpackungen bei Ovex Pack",
  });

  const category = categories?.find((c) => c.id === product?.categoryId);

  const addToCart = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/cart", {
        productId: product!.id,
        quantity,
        size: selectedSize || (product?.sizes?.[0] ?? null),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "In den Warenkorb gelegt",
        description: `${quantity}x ${product?.name} wurde hinzugefuegt.`,
      });
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "Produkt konnte nicht hinzugefuegt werden.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Skeleton className="h-5 w-32 mb-8" />
        <div className="grid lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-[4/3] rounded-md" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-12 w-48 mt-8" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Produkt nicht gefunden</h2>
        <Link href="/produkte">
          <Button variant="outline" data-testid="button-back-products">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurueck zu Produkten
          </Button>
        </Link>
      </div>
    );
  }

  const incrementQty = () => setQuantity((q) => q + product.minQuantity);
  const decrementQty = () => setQuantity((q) => Math.max(product.minQuantity, q - product.minQuantity));

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12" data-testid="page-product-detail">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors" data-testid="breadcrumb-home">
          Startseite
        </Link>
        <span>/</span>
        <Link href="/produkte" className="hover:text-foreground transition-colors" data-testid="breadcrumb-products">
          Produkte
        </Link>
        {category && (
          <>
            <span>/</span>
            <Link
              href={`/produkte?cat=${category.slug}`}
              className="hover:text-foreground transition-colors"
            >
              {category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="space-y-8">
          <div className="rounded-md overflow-hidden bg-muted/20">
            <img
              src={product.imageUrl || ""}
              alt={product.name}
              className="w-full h-auto object-cover"
              data-testid="img-product"
            />
          </div>

          <ProductConfigurator3D
            productName={product.name}
          />
        </div>

        <div>
          <div className="flex items-start gap-2 mb-3 flex-wrap">
            {product.eco && (
              <Badge variant="secondary">
                <Recycle className="w-3 h-3 mr-1" />
                Umweltfreundlich
              </Badge>
            )}
            {category && (
              <Badge variant="outline">{category.name}</Badge>
            )}
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4" data-testid="text-product-name">
            {product.name}
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-8 text-lg" data-testid="text-product-description">
            {product.description}
          </p>

          <div className="text-3xl font-bold mb-8" data-testid="text-product-price">
            ab CHF {product.basePrice}
          </div>

          <Separator className="my-8" />

          <div className="space-y-5">
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-2 block">Groesse</label>
                <Select
                  value={selectedSize || product.sizes[0]}
                  onValueChange={setSelectedSize}
                >
                  <SelectTrigger data-testid="select-size">
                    <SelectValue placeholder="Groesse waehlen" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-2 block">
                Menge (Min. {product.minQuantity} Stueck)
              </label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQty}
                  disabled={quantity <= product.minQuantity}
                  data-testid="button-qty-minus"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(product.minQuantity, parseInt(e.target.value) || product.minQuantity))}
                  className="w-24 text-center"
                  min={product.minQuantity}
                  data-testid="input-quantity"
                />
                <Button variant="outline" size="icon" onClick={incrementQty} data-testid="button-qty-plus">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {product.material && (
              <div className="text-sm">
                <span className="text-muted-foreground">Material: </span>
                <span className="font-medium" data-testid="text-material">{product.material}</span>
              </div>
            )}
          </div>

          <Button
            size="lg"
            className="w-full mt-8 text-base"
            onClick={() => addToCart.mutate()}
            disabled={addToCart.isPending}
            data-testid="button-add-to-cart"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {addToCart.isPending ? "Wird hinzugefuegt..." : "In den Warenkorb"}
          </Button>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center p-4 rounded-md bg-muted/30">
              <Truck className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Gratis Versand</span>
            </div>
            <div className="text-center p-4 rounded-md bg-muted/30">
              <Palette className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Gratis Design</span>
            </div>
            <div className="text-center p-4 rounded-md bg-muted/30">
              <Shield className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Preisgarantie</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
