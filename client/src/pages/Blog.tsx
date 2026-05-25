import { useQuery } from "@tanstack/react-query";
import { BlogCard } from "@/components/BlogCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo } from "react";
import type { BlogPost } from "@shared/schema";
import { useSeo } from "@/hooks/use-seo";

const categories = [
  { value: "all", label: "All Articles" },
  { value: "safety-tips", label: "Safety Tips" },
  { value: "setup-guides", label: "Setup Guides" },
  { value: "parenting-tech", label: "Parenting Tech" },
];

export default function Blog() {
  useSeo({
    title: "Apple Watch for Kids: Safety Guides & Setup Tips | KidWatch Blog",
    description: "Expert guides on setting up Apple Watch SE for children. GPS tracking tips, Family Setup tutorials, child safety advice and parenting tech resources.",
  });

  const [category, setCategory] = useState("all");

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/posts"],
  });

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    if (category === "all") return posts;
    return posts.filter((p) => p.category === category);
  }, [posts, category]);

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen">
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4">Blog</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-blog-title">
              Guides & Resources
            </h1>
            <p className="text-lg text-muted-foreground">
              Expert tips on keeping your kids safe, setting up their watch, 
              and navigating technology as a parent.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={category === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(cat.value)}
                data-testid={`button-category-${cat.value}`}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="space-y-8">
              <Card>
                <CardContent className="p-0 md:flex">
                  <Skeleton className="aspect-video md:w-1/2 rounded-t-lg md:rounded-l-lg md:rounded-tr-none" />
                  <div className="p-8 md:w-1/2 space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardContent>
              </Card>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-0">
                      <Skeleton className="aspect-video rounded-t-lg" />
                      <div className="p-5 space-y-3">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                No articles found in this category.
              </p>
              <Button
                variant="outline"
                onClick={() => setCategory("all")}
                data-testid="button-show-all"
              >
                Show All Articles
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {featuredPost && (
                <BlogCard post={featuredPost} featured />
              )}
              {regularPosts.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
