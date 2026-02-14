import { Link, useSearch } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Category, Product } from "@shared/schema";
import { Search, Recycle, X } from "lucide-react";
import { useState, useMemo } from "react";
import { useSEO } from "@/hooks/use-seo";

export default function Products() {
  useSEO({
    title: "Produkte",
    description: "Entdecken Sie unsere grosse Auswahl an individuell bedruckbaren Verpackungen - Pappbecher, Papiertueten, Boxen und mehr.",
  });

  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const catFilter = params.get("cat") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(catFilter);
  const [materialFilter, setMaterialFilter] = useState("");

  const handleCategoryChange = (val: string) => setSelectedCategory(val === "all" ? "" : val);
  const handleMaterialChange = (val: string) => setMaterialFilter(val === "all" ? "" : val);

  const { data: categories, isLoading: catLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: products, isLoading: prodLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory ||
        categories?.find((c) => c.slug === selectedCategory)?.id === p.categoryId;
      const matchesMaterial =
        !materialFilter || p.material?.toLowerCase() === materialFilter.toLowerCase();
      return matchesSearch && matchesCategory && matchesMaterial;
    });
  }, [products, searchQuery, selectedCategory, materialFilter, categories]);

  const materials = useMemo(() => {
    if (!products) return [];
    const mats = new Set(products.map((p) => p.material).filter(Boolean));
    return Array.from(mats) as string[];
  }, [products]);

  const hasFilters = searchQuery || selectedCategory || materialFilter;

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMaterialFilter("");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16" data-testid="page-products">
      <div className="mb-12">
        <h1 className="text-3xl lg:text-5xl font-bold tracking-tight mb-3" data-testid="text-products-title">
          Unsere Produkte
        </h1>
        <p className="text-lg text-muted-foreground">
          Individuell bedruckte Verpackungen fuer Ihr Unternehmen
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-10 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Produkte suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search"
          />
        </div>
        <Select value={selectedCategory || "all"} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full sm:w-48" data-testid="select-category">
            <SelectValue placeholder="Kategorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Kategorien</SelectItem>
            {categories?.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={materialFilter || "all"} onValueChange={handleMaterialChange}>
          <SelectTrigger className="w-full sm:w-48" data-testid="select-material">
            <SelectValue placeholder="Material" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Materialien</SelectItem>
            {materials.map((mat) => (
              <SelectItem key={mat} value={mat.toLowerCase()}>
                {mat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} data-testid="button-clear-filters">
            <X className="w-4 h-4 mr-1" />
            Filter loeschen
          </Button>
        )}
      </div>

      {(catLoading || prodLoading) ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[4/3] rounded-md" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-5">
            <Search className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2" data-testid="text-no-results">Keine Produkte gefunden</h3>
          <p className="text-muted-foreground mb-6">
            Versuchen Sie, Ihre Suchkriterien anzupassen.
          </p>
          <Button variant="outline" onClick={clearFilters} data-testid="button-reset-search">
            Filter zuruecksetzen
          </Button>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-6" data-testid="text-result-count">
            {filteredProducts.length} Produkt{filteredProducts.length !== 1 ? "e" : ""} gefunden
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/produkt/${product.slug}`}>
                <Card
                  className="overflow-hidden group hover-elevate cursor-pointer h-full"
                  data-testid={`card-product-${product.id}`}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted/20">
                    <img
                      src={product.imageUrl || ""}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                      {product.eco && (
                        <Badge variant="secondary" className="shrink-0">
                          <Recycle className="w-3 h-3 mr-1" />
                          Eco
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="font-semibold">
                        ab CHF {product.basePrice}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Min. {product.minQuantity} St.
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
