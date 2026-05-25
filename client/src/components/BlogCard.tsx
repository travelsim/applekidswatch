import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const categoryLabels = {
  "safety-tips": "Safety Tips",
  "setup-guides": "Setup Guides",
  "parenting-tech": "Parenting Tech",
};

const categoryColors = {
  "safety-tips": "bg-accent text-accent-foreground",
  "setup-guides": "bg-primary text-primary-foreground",
  "parenting-tech": "bg-secondary text-secondary-foreground",
};

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card 
        className={`group overflow-visible hover-elevate cursor-pointer ${
          featured ? "md:col-span-2 lg:col-span-3" : ""
        }`}
        data-testid={`card-blog-${post.slug}`}
      >
        <CardContent className={`p-0 ${featured ? "md:flex" : ""}`}>
          <div className={`relative overflow-hidden rounded-t-lg ${
            featured ? "md:rounded-l-lg md:rounded-tr-none md:w-1/2 aspect-video md:aspect-auto" : "aspect-video"
          } bg-muted`}>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Badge
              className={`absolute top-3 left-3 ${categoryColors[post.category]}`}
              data-testid={`badge-category-${post.slug}`}
            >
              {categoryLabels[post.category]}
            </Badge>
          </div>
          <div className={`p-5 space-y-3 ${featured ? "md:w-1/2 md:flex md:flex-col md:justify-center md:p-8" : ""}`}>
            <h3 
              className={`font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors ${
                featured ? "text-xl md:text-2xl" : "text-base"
              }`}
              data-testid={`text-blog-title-${post.slug}`}
            >
              {post.title}
            </h3>
            <p className={`text-muted-foreground line-clamp-2 ${featured ? "text-base" : "text-sm"}`}>
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Read more
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
