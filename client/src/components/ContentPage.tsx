import { Link } from "wouter";
import { useSeo } from "@/hooks/use-seo";
import { breadcrumbList } from "@/lib/structured-data";

export interface ContentSection {
  heading: string;
  paragraphs: string[];
}

interface ContentPageProps {
  path: string;
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  sections: ContentSection[];
}

// Type and colour follow Apple's kids page: system sans, near-black text,
// grey secondary copy, and a pill-shaped blue action.
const fontStack = '"SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif';

export function ContentPage({ path, title, seoTitle, description, intro, sections }: ContentPageProps) {
  useSeo({ title: seoTitle, description });

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]" style={{ fontFamily: fontStack }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbList([
            { name: "Home", path: "/" },
            { name: title, path },
          ]),
        }}
      />
      <div className="container mx-auto px-4 md:px-6 pt-12 pb-20 md:pt-20 max-w-[720px]">
        <nav className="text-xs text-[#6e6e73] mb-8">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span>{title}</span>
        </nav>
        <h1 className="text-4xl md:text-[56px] leading-[1.07] font-semibold tracking-[-0.02em] mb-5">{title}</h1>
        <p className="text-xl md:text-2xl leading-[1.4] text-[#6e6e73] font-normal mb-14">{intro}</p>
        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.heading} className="space-y-4 border-t border-[#d2d2d7] pt-10">
              <h2 className="text-2xl md:text-[28px] leading-[1.14] font-semibold tracking-[-0.01em]">{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-[17px] leading-[1.47] text-[#1d1d1f]">{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
        <div className="mt-16">
          <Link
            href="/shop"
            className="inline-flex items-center rounded-full bg-[#0071e3] px-5 py-2 text-[17px] text-white hover:bg-[#0077ed] transition-colors"
          >
            Shop kids kits
          </Link>
        </div>
      </div>
    </div>
  );
}
