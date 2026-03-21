'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { articles } from '@/lib/articles';

gsap.registerPlugin(ScrollTrigger);

const posts = articles.map((a) => ({ ...a, href: `/knowledge/${a.slug}` }));

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-heading',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.blog-heading', start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.fromTo(
        '.blog-card',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.blog-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="blog-heading flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#05CCF7]/10 border border-[#05CCF7]/20 text-sm text-[#05CCF7] font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Knowledge Base
            </div>
            <h2 className="text-4xl sm:text-5xl font-black">
              <span className="text-white">Tips, Guides</span>
              <br />
              <span className="gradient-text">&amp; Tutorials</span>
            </h2>
          </div>
          <Link
            href="/knowledge"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-white/20 font-semibold text-sm transition-all hover:gap-3 self-start md:self-auto"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog cards */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link
              key={i}
              href={post.href}
              className={`blog-card block rounded-2xl overflow-hidden bg-linear-to-br ${post.gradient} border border-white/5 hover:border-white/10 group transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Card gradient header */}
              <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${post.color}, ${post.color}50)` }} />

              <div className="p-7">
                {/* Meta */}
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span
                    className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${post.color}15`, color: post.color }}
                  >
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-400">
                    {post.lang}
                  </span>
                </div>

                <h3 className={`text-white font-bold text-lg leading-snug mb-3 group-hover:text-[#05CCF7] transition-colors line-clamp-2${post.lang === 'বাংলা' ? ' font-bn' : ''}`}>
                  {post.title}
                </h3>

                <p className={`text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3${post.lang === 'বাংলা' ? ' font-bn' : ''}`}>
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} read
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-[#05CCF7] font-medium group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
