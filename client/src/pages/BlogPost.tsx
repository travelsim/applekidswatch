import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogCard } from "@/components/BlogCard";
import { ArrowLeft, Clock, User, Calendar, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";
import { useSeo } from "@/hooks/use-seo";

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

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/posts"],
  });

  const post = posts?.find((p) => p.slug === slug);
  const relatedPosts = posts?.filter((p) => p.slug !== slug && p.category === post?.category).slice(0, 3);

  useSeo({
    title: post
      ? `${post.title} | KidWatch Blog`
      : "Apple Watch Kids Safety Guide | KidWatch Blog",
    description: post
      ? post.excerpt
      : "Expert guides on Apple Watch SE setup, child safety features, and parenting technology.",
    canonical: post ? `/blog/${post.slug}` : undefined,
    ogImage: post?.image,
  });

  const articleJsonLd = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": { "@type": "Person", "name": post.author },
    "datePublished": post.publishedAt,
    "publisher": {
      "@type": "Organization",
      "name": "KidWatch",
      "logo": { "@type": "ImageObject", "url": "/favicon.png" },
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `/blog/${post.slug}` },
    "wordCount": post.content.split(/\s+/).length,
    "timeRequired": `PT${post.readTime}M`,
  } : null;

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 md:px-6">
          <Skeleton className="h-6 w-32 mb-8" />
          <Skeleton className="aspect-video max-w-4xl mx-auto rounded-2xl mb-8" />
          <div className="max-w-3xl mx-auto space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="space-y-4 pt-8">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist.
          </p>
          <Link href="/blog">
            <Button data-testid="button-back-to-blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      <section className="py-4 border-b">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-back-blog">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </section>

      <article className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden bg-muted mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="max-w-3xl mx-auto">
              <Badge className={categoryColors[post.category]} data-testid="badge-post-category">
                {categoryLabels[post.category]}
              </Badge>

              <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-6" data-testid="text-post-title">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { 
                    year: "numeric", 
                    month: "long", 
                    day: "numeric" 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none" data-testid="text-post-content">
                {post.content.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Keep Your Kids Safe Today</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Browse our collection of refurbished Apple SE watches with Better Roaming connectivity.
          </p>
          <Link href="/shop">
            <Button size="lg" data-testid="button-shop-cta">
              Shop Watches
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
