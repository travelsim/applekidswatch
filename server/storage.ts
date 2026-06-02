import { type User, type InsertUser, type Product, type InsertProduct, type BlogPost, type InsertBlogPost, type Order, type InsertOrder, type Testimonial, products, blogPosts, users, newsletterSubscribers, orders, testimonials } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getPosts(): Promise<BlogPost[]>;
  getPost(slug: string): Promise<BlogPost | undefined>;
  addNewsletterSubscriber(email: string): Promise<void>;
  getTestimonials(): Promise<Testimonial[]>;
  seedData(): Promise<void>;
  createOrder(order: InsertOrder): Promise<Order>;
  getOrders(): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  getOrderByStripeSessionId(sessionId: string): Promise<Order | undefined>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
}

const seedProducts: InsertProduct[] = [
  {
    name: "Apple Watch SE (2nd Gen) - GPS + Cellular",
    description: "Perfect for kids with GPS tracking, cellular connectivity, and Family Setup. This refurbished Apple Watch SE is in excellent condition with minimal signs of use.",
    price: 179,
    originalPrice: 299,
    grade: "excellent",
    color: "Midnight",
    storage: "32GB",
    image: "/images/apple_watch_midnight.png",
    features: [
      "GPS + Cellular connectivity",
      "Water resistant to 50 meters",
      "Family Setup compatible",
      "Fall detection and Emergency SOS",
      "Heart rate monitoring",
      "Activity tracking and rewards"
    ],
    inStock: true
  },
  {
    name: "Apple Watch SE (2nd Gen) - GPS + Cellular",
    description: "A great choice for active kids who love outdoor adventures. This good condition watch shows minor cosmetic wear but works perfectly.",
    price: 149,
    originalPrice: 299,
    grade: "good",
    color: "Starlight",
    storage: "32GB",
    image: "/images/apple_watch_starlight.png",
    features: [
      "GPS + Cellular connectivity",
      "Water resistant to 50 meters",
      "Family Setup compatible",
      "Emergency SOS",
      "Heart rate monitoring",
      "Workout tracking"
    ],
    inStock: true
  },
  {
    name: "Apple Watch SE (1st Gen) - GPS + Cellular",
    description: "Budget-friendly option with all the essential safety features. Fair condition with visible wear but fully functional.",
    price: 119,
    originalPrice: 249,
    grade: "fair",
    color: "Silver",
    storage: "32GB",
    image: "/images/apple_watch_silver.png",
    features: [
      "GPS + Cellular connectivity",
      "Water resistant to 50 meters",
      "Family Setup compatible",
      "Emergency SOS",
      "Basic health tracking"
    ],
    inStock: true
  },
  {
    name: "Apple Watch SE (2nd Gen) - GPS + Cellular",
    description: "Like-new condition with premium band included. Perfect for kids who want a stylish and safe watch experience.",
    price: 189,
    originalPrice: 329,
    grade: "excellent",
    color: "Pink",
    storage: "32GB",
    image: "/images/apple_watch_pink.png",
    features: [
      "GPS + Cellular connectivity",
      "Water resistant to 50 meters",
      "Family Setup compatible",
      "Fall detection and Emergency SOS",
      "Heart rate monitoring",
      "Premium sport band included"
    ],
    inStock: true
  },
  {
    name: "Apple Watch SE (2nd Gen) - GPS + Cellular",
    description: "Great value for families looking for quality at an affordable price. Good condition with minor cosmetic wear.",
    price: 159,
    originalPrice: 299,
    grade: "good",
    color: "Blue",
    storage: "32GB",
    image: "/images/apple_watch_blue.png",
    features: [
      "GPS + Cellular connectivity",
      "Water resistant to 50 meters",
      "Family Setup compatible",
      "Emergency SOS",
      "Heart rate and sleep tracking"
    ],
    inStock: true
  },
  {
    name: "Apple Watch SE (1st Gen) - GPS + Cellular",
    description: "Entry-level option for budget-conscious families. All essential safety features at our lowest price.",
    price: 99,
    originalPrice: 229,
    grade: "fair",
    color: "Space Gray",
    storage: "32GB",
    image: "/images/apple_watch_space_gray.png",
    features: [
      "GPS + Cellular connectivity",
      "Water resistant to 50 meters",
      "Family Setup compatible",
      "Emergency SOS"
    ],
    inStock: false
  }
];

const seedBlogPosts: InsertBlogPost[] = [
  {
    title: "Setting Up Your Child's First Apple Watch: A Complete Guide",
    slug: "setting-up-childs-first-apple-watch",
    excerpt: "Everything you need to know about setting up Family Setup, configuring safety features, and getting your child started with their new watch.",
    content: `Getting your child their first Apple Watch is an exciting step toward keeping them connected and safe. This guide will walk you through everything you need to know about setting up the watch using Apple's Family Setup feature.

Before you begin, make sure you have an iPhone 6s or later with the latest iOS installed. You'll also need the child's Apple Watch SE with cellular capability and a Better Roaming SIM card.

Start by opening the Watch app on your iPhone and selecting "Set Up for a Family Member." Follow the on-screen instructions to pair the watch with your phone. During setup, you'll create an Apple ID for your child if they don't already have one.

Next, configure the safety features. Enable Location Sharing so you can always see where your child is. Set up approved contacts - these are the only people who can call or message your child. Create School Time schedules to limit features during class hours.

Don't forget to set up the emergency features. Enable Emergency SOS so your child can quickly call for help if needed. Add your emergency contacts and configure Fall Detection if appropriate for your child's age and activities.

Finally, personalize the watch for your child. Let them choose fun watch faces and set up activity goals. Show them how to make calls, send messages, and use the basic features. With everything configured, your child is ready to enjoy their new watch safely!`,
    category: "setup-guides",
    image: "/images/apple_watch_silver.png",
    author: "Sarah Johnson",
    publishedAt: "2024-01-15",
    readTime: 8
  },
  {
    title: "GPS Tracking for Kids: How It Works and Why It Matters",
    slug: "gps-tracking-for-kids-explained",
    excerpt: "Understand how GPS tracking on Apple Watch keeps your kids safe and gives you peace of mind without being intrusive.",
    content: `GPS tracking has become an essential tool for parents who want to keep their children safe while still giving them freedom to explore. Here's how it works on the Apple Watch SE and why it matters for your family.

The Apple Watch SE uses a combination of GPS satellites, Wi-Fi networks, and cellular towers to determine your child's location. This multi-source approach ensures accurate positioning whether your child is at school, the park, or a friend's house.

Location sharing works through the Find My app on your iPhone. Once enabled, you can see your child's current location on a map at any time. The watch updates its location regularly, so you always have recent information.

One of the most useful features is geofencing. You can set up "safe zones" around important locations like home, school, or grandparents' house. When your child enters or leaves these zones, you'll receive a notification on your iPhone. This gives you peace of mind without having to constantly check their location.

Privacy is important too. The location data is encrypted and only shared with family members you've approved. Your child's location isn't tracked by third parties, and you have complete control over who can see it.

Remember, the goal of GPS tracking isn't surveillance - it's safety and peace of mind. Use it as a tool to give your child more independence while knowing you can always find them if needed.`,
    category: "safety-tips",
    image: "/images/apple_watch_gps_feature.png",
    author: "Michael Chen",
    publishedAt: "2024-01-10",
    readTime: 6
  },
  {
    title: "5 Ways to Keep Your Child Safe with Apple Watch",
    slug: "5-ways-keep-child-safe-apple-watch",
    excerpt: "Discover the top safety features of Apple Watch that every parent should know and use to protect their children.",
    content: `The Apple Watch SE comes packed with safety features designed specifically for families. Here are five essential ways to use these features to keep your child safe.

1. Emergency SOS
Teach your child how to activate Emergency SOS by pressing and holding the side button. This will call emergency services and send their location to your emergency contacts. Practice this with them so they're confident using it in a real emergency.

2. Safe Contacts Only
Configure the watch so only approved contacts can reach your child. This prevents strangers from calling or messaging them. You can add family members, close friends, and trusted adults to the approved list.

3. Location Sharing
Enable location sharing so you can always see where your child is. Set up notifications for when they leave or arrive at important places like school or home.

4. School Time Mode
Use School Time to limit the watch's features during school hours. Your child can still use emergency features, but won't be distracted by games or messages during class.

5. Fall Detection
For older kids who are more active, enable Fall Detection. If the watch detects a hard fall and your child doesn't respond, it will automatically call emergency services.

By using all these features together, you create a comprehensive safety net for your child while still giving them the independence they crave.`,
    category: "safety-tips",
    image: "/images/apple_watch_safety.png",
    author: "Jennifer Williams",
    publishedAt: "2024-01-05",
    readTime: 5
  },
  {
    title: "Why Refurbished Apple Watches Are Perfect for Kids",
    slug: "why-refurbished-apple-watches-perfect-for-kids",
    excerpt: "Learn why certified refurbished watches offer the best value for families and how they're just as reliable as new devices.",
    content: `When it comes to kids and technology, refurbished devices often make the most sense. Here's why choosing a certified refurbished Apple Watch SE is a smart decision for your family.

Kids are rough on electronics. No matter how careful they try to be, watches get bumped, scratched, and sometimes dropped. Buying refurbished means you get Apple quality at a fraction of the price, so the inevitable wear and tear doesn't sting as much.

Our certified refurbished watches go through a rigorous inspection and testing process. Every watch is thoroughly cleaned, any worn parts are replaced, and the battery is tested to ensure it meets our standards. The result is a watch that looks and works like new.

You're also making an environmentally responsible choice. By giving these watches a second life, you're helping reduce electronic waste. It's a great lesson to teach your kids about sustainability.

All our refurbished watches come with the same 30-day guarantee as new devices. If anything goes wrong, we'll make it right. You get peace of mind without the premium price tag.

Finally, refurbished doesn't mean outdated. The Apple Watch SE has all the features kids need - GPS, cellular, emergency SOS, and Family Setup compatibility. Whether you buy new or refurbished, your child gets the same great experience.`,
    category: "parenting-tech",
    image: "/images/apple_watch_midnight.png",
    author: "David Park",
    publishedAt: "2024-01-01",
    readTime: 4
  },
  {
    title: "Better Roaming: The Best Cellular Plan for Kids' Watches",
    slug: "better-roaming-best-cellular-plan-kids-watches",
    excerpt: "Discover why Better Roaming's kid-safe cellular plans are the perfect match for your child's Apple Watch.",
    content: `Choosing the right cellular plan for your child's Apple Watch is just as important as choosing the watch itself. That's why we've partnered with Better Roaming to offer the best kid-safe cellular plans available.

Better Roaming understands that kids' needs are different from adults'. Their plans are designed specifically for children's devices, with built-in parental controls and transparent pricing.

With Better Roaming, you get complete control over your child's connectivity. You can set data limits, restrict calling to approved contacts only, and monitor usage through their parent portal. It's everything you need to keep your child connected safely.

Pricing is simple and affordable. Plans start at just $10 per month with no hidden fees or long-term contracts. You pay for what you use, and you can adjust or cancel anytime.

Coverage is nationwide, using major network infrastructure. Whether you're in the city or visiting grandparents in a rural area, your child's watch stays connected.

Setting up is easy too. When you buy a watch from us, we'll help you activate your Better Roaming service. Within minutes, your child will be ready to make calls, send messages, and share their location.

Better Roaming is the perfect complement to a KidWatch refurbished Apple Watch. Together, they provide everything your family needs to stay connected and safe.`,
    category: "setup-guides",
    image: "/images/apple_watch_cellular.png",
    author: "Amanda Foster",
    publishedAt: "2023-12-28",
    readTime: 5
  },
  {
    title: "Teaching Your Child to Use Their Apple Watch Responsibly",
    slug: "teaching-child-use-apple-watch-responsibly",
    excerpt: "Tips for helping your child understand the responsibilities that come with their new smartwatch.",
    content: `Getting an Apple Watch is a big step for a child. Along with the fun features comes responsibility. Here's how to help your child understand and embrace that responsibility.

Start with a conversation about why they're getting the watch. Explain that it's primarily a safety device that helps you stay connected. The games and fun features are bonuses, not the main purpose.

Set clear expectations about when and how to use the watch. Establish rules like no using the watch during homework time, at the dinner table, or after bedtime. School Time mode can help enforce these boundaries automatically.

Teach them about emergency features. Practice using Emergency SOS together so they know exactly what to do in a crisis. Explain when it's appropriate to use these features - real emergencies only.

Discuss privacy and safety. Explain why they can only communicate with approved contacts. Help them understand that you can see their location because you care about their safety, not because you don't trust them.

Create a simple maintenance routine. Show them how to charge the watch properly and how to clean it. Taking care of their device teaches responsibility.

Finally, make it a positive experience. Celebrate milestones like completing activity goals. Let them personalize their watch face. When technology is fun and rewarding, kids are more likely to use it responsibly.`,
    category: "parenting-tech",
    image: "/images/apple_watch_activity.png",
    author: "Rachel Thompson",
    publishedAt: "2023-12-20",
    readTime: 6
  }
];

const seedTestimonials = [
  {
    name: "Sarah M.",
    role: "Mom of 2",
    quote: "Finally, a watch that gives me peace of mind! I can always check on my kids' location and they love the fun watch faces. The GPS tracking works flawlessly.",
    rating: 5,
    initials: "SM",
    avatarColor: "bg-pink-500",
    isFeatured: true,
    sortOrder: 1,
  },
  {
    name: "David K.",
    role: "Father",
    quote: "The refurbished quality is amazing — you'd never know it wasn't new. Great value for a premium product. My daughter wears hers every day without issues.",
    rating: 5,
    initials: "DK",
    avatarColor: "bg-blue-500",
    isFeatured: true,
    sortOrder: 2,
  },
  {
    name: "Jennifer L.",
    role: "Working Parent",
    quote: "Better Roaming integration means my son can call me anytime. The safety features are exactly what we needed. I finally feel comfortable letting him walk to school alone.",
    rating: 5,
    initials: "JL",
    avatarColor: "bg-purple-500",
    isFeatured: true,
    sortOrder: 3,
  },
  {
    name: "Michael R.",
    role: "Dad of 3",
    quote: "We bought watches for all three kids. The GPS tracking and geofencing alerts are game changers! Now we get a notification when they arrive at school.",
    rating: 5,
    initials: "MR",
    avatarColor: "bg-emerald-500",
    isFeatured: true,
    sortOrder: 4,
  },
  {
    name: "Amanda T.",
    role: "Single Mom",
    quote: "The 30-day guarantee gave me confidence to try it. Now I recommend KidWatch to all my parent friends. The savings compared to buying new are incredible.",
    rating: 5,
    initials: "AT",
    avatarColor: "bg-amber-500",
    isFeatured: true,
    sortOrder: 5,
  },
  {
    name: "Chris P.",
    role: "Father of Twins",
    quote: "Setting up Family Setup was easy with the guide they provide. Both twins have their watches and I can track them at different after-school activities. Worth every penny.",
    rating: 5,
    initials: "CP",
    avatarColor: "bg-cyan-500",
    isFeatured: true,
    sortOrder: 6,
  },
];

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return db.select().from(products);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts);
  }

  async getPost(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async addNewsletterSubscriber(email: string): Promise<void> {
    await db.insert(newsletterSubscribers).values({ email }).onConflictDoNothing();
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).orderBy(testimonials.sortOrder);
  }

  async seedData(): Promise<void> {
    const existingProducts = await db.select().from(products);
    if (existingProducts.length === 0) {
      await db.insert(products).values(seedProducts);
    } else {
      const needsUpdate = existingProducts.some(p => !p.image.startsWith("/images/"));
      if (needsUpdate) {
        await db.delete(products);
        await db.insert(products).values(seedProducts);
      }
    }
    
    const existingPosts = await db.select().from(blogPosts);
    if (existingPosts.length === 0) {
      await db.insert(blogPosts).values(seedBlogPosts);
    } else {
      const needsUpdate = existingPosts.some(p => !p.image.startsWith("/images/"));
      if (needsUpdate) {
        await db.delete(blogPosts);
        await db.insert(blogPosts).values(seedBlogPosts);
      }
    }

    const existingTestimonials = await db.select().from(testimonials);
    if (existingTestimonials.length === 0) {
      await db.insert(testimonials).values(seedTestimonials as any);
    }
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    return order;
  }

  async getOrders(): Promise<Order[]> {
    return db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async getOrderByStripeSessionId(sessionId: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.stripeSessionId, sessionId));
    return order;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const [order] = await db.update(orders).set({ status }).where(eq(orders.id, id)).returning();
    return order;
  }
}

export const storage = new DatabaseStorage();
