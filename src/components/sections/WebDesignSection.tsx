'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Smartphone, Code, Globe, Layers, ArrowRight } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const webPackages = [
  { name: 'Company Website', type: 'Basic', price: 'Tk. 7,500', features: ['5 Pages', 'Responsive Design', 'Contact Form', 'SEO Ready'] },
  { name: 'Company Website', type: 'Standard', price: 'Tk. 10,000', features: ['10+ Pages', 'CMS Integration', 'Social Media', 'Google Analytics'] },
  { name: 'Newspaper Website', type: 'Dynamic', price: 'Tk. 7,500', features: ['Breaking News', 'Category Archive', 'Search Feature', 'Comment System'] },
  { name: 'E-commerce Store', type: 'Shop', price: 'Tk. 15,000+', features: ['Product Catalog', 'Payment Gateway', 'Inventory Mgmt', 'Order Tracking'] },
  { name: 'Educational Website', type: 'LMS', price: 'Tk. 10,000', features: ['Course System', 'Student Portal', 'Assignment Upload', 'Progress Track'] },
  { name: 'Portfolio Website', type: 'Creative', price: 'Tk. 7,500', features: ['Portfolio Gallery', 'Client Showcase', 'Blog Section', 'Contact Form'] },
];

const techStack = [
  { name: 'React', color: '#61dafb' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'WordPress', color: '#21759b' },
  { name: 'PHP Laravel', color: '#ff2d20' },
  { name: 'MongoDB', color: '#47a248' },
  { name: 'MySQL', color: '#4479a1' },
  { name: 'Tailwind CSS', color: '#06b6d4' },
];

export default function WebDesignSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.webdesign-heading',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.webdesign-heading', start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.fromTo(
        '.web-package-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.packages-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.fromTo(
        '.tech-badge',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: '.tech-stack-row', start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#6366f1]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="webdesign-heading grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-sm text-[#6366f1] font-medium mb-6">
              <Monitor className="w-4 h-4" />
              Web Design & Development
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-6">
              <span className="text-white">Beautiful Websites</span>
              <br />
              <span className="gradient-text">Built to Convert</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              We build stunning, high-performance websites that look great on all devices.
              From simple brochure sites to complex web applications — we&apos;ve got you covered.
              Typical turnaround: 4–5 weeks.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/web-design" className="inline-flex items-center gap-2 whitespace-nowrap px-8 py-3 rounded-lg font-semibold text-white transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #05CCF7 0%, #0284c7 100%)' }}>
                View All Packages
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-white/20 font-semibold text-sm transition-all"
              >
                Get a Quote
              </Link>
            </div>
          </div>

          {/* Feature list */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Smartphone, label: 'Mobile Responsive', desc: 'Perfect on all screen sizes' },
              { icon: Code, label: 'Clean Code', desc: 'Modern, maintainable codebase' },
              { icon: Globe, label: 'SEO Optimized', desc: 'Built for search engines' },
              { icon: Layers, label: 'CMS Ready', desc: 'Easy content management' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="glass-card rounded-xl p-5 border border-white/5">
                <Icon className="w-6 h-6 text-[#6366f1] mb-3" />
                <div className="text-white font-semibold text-sm mb-1">{label}</div>
                <div className="text-gray-500 text-xs">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="tech-stack-row mb-16">
          <div className="text-center text-sm text-gray-500 mb-6">Technologies We Use</div>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map(({ name, color }) => (
              <div
                key={name}
                className="tech-badge px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm font-medium hover:bg-white/[0.08] transition-all cursor-default"
                style={{ color }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="packages-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {webPackages.map(({ name, type, price, features }) => (
            <div
              key={`${name}-${type}`}
              className="web-package-card glass-card rounded-2xl p-6 border border-white/5 hover:border-[#6366f1]/30 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs text-[#6366f1] font-semibold uppercase tracking-wider mb-1">{type}</div>
                  <h3 className="text-white font-bold text-lg">{name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-[#05CCF7] font-black text-lg">{price}</div>
                  <div className="text-xs text-gray-600">Starting from</div>
                </div>
              </div>

              <ul className="space-y-2 mb-5">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 bg-[#6366f1] rounded-full shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="flex items-center gap-2 text-sm font-semibold text-[#6366f1] hover:gap-3 transition-all"
              >
                Get Quote <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
