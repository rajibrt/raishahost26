'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTASection from '@/components/sections/CTASection';
import { Palette, Brush, Layers, Check, ArrowRight, ImageIcon, Printer, MonitorSmartphone, FileImage, PenTool, Sparkles } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  'Food & Beverage', 'Professional Services', 'Retail & E-commerce',
  'Health & Wellness', 'Technology', 'Education', 'Real Estate', 'Non-profit',
];

const logoFeatures = [
  { icon: Palette, title: 'Custom Brand Identity', desc: 'Unique logo tailored to your brand personality and values.' },
  { icon: Brush, title: 'Multiple Revisions', desc: 'We refine until you are completely satisfied with the result.' },
  { icon: Layers, title: 'All File Formats', desc: 'PNG, SVG, PDF, EPS — every format you need for print and web.' },
  { icon: Check, title: '30-Day Guarantee', desc: 'Full refund within 30 days if you are not satisfied.' },
];

const graphicServices = [
  {
    icon: FileImage,
    title: 'Social Media Graphics',
    desc: 'Facebook covers, Instagram posts, YouTube thumbnails — eye-catching visuals for every platform.',
    color: '#05CCF7',
  },
  {
    icon: Printer,
    title: 'Print & Branding',
    desc: 'Business cards, letterheads, brochures, banners, and all print-ready marketing materials.',
    color: '#6366f1',
  },
  {
    icon: MonitorSmartphone,
    title: 'UI/UX Design',
    desc: 'App screens, web page mockups, and interactive prototypes with pixel-perfect attention to detail.',
    color: '#f59e0b',
  },
  {
    icon: ImageIcon,
    title: 'Flyer & Poster Design',
    desc: 'Promotional flyers, event posters, and product advertisements designed to grab attention.',
    color: '#10b981',
  },
  {
    icon: PenTool,
    title: 'Illustration & Infographic',
    desc: 'Custom illustrations, data visualizations, and infographics that communicate complex ideas simply.',
    color: '#ec4899',
  },
  {
    icon: Sparkles,
    title: 'Brand Style Guide',
    desc: 'Complete brand guidelines — colors, typography, usage rules — to keep your brand consistent everywhere.',
    color: '#8b5cf6',
  },
];

export default function LogoDesignContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoFeaturesRef = useRef<HTMLDivElement>(null);
  const graphicHeadingRef = useRef<HTMLDivElement>(null);
  const graphicGridRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 });

    gsap.fromTo(
      Array.from(logoFeaturesRef.current?.children ?? []),
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: logoFeaturesRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      }
    );

    gsap.fromTo(
      graphicHeadingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: graphicHeadingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    );

    gsap.fromTo(
      Array.from(graphicGridRef.current?.children ?? []),
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: graphicGridRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      }
    );

    gsap.fromTo(
      industriesRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: industriesRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    );
  }, []);

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#f59e0b]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#ec4899]/5 rounded-full blur-3xl pointer-events-none" />

        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-sm text-[#f59e0b] font-medium mb-6">
            <Palette className="w-4 h-4" />
            Logo & Graphic Design
          </div>
          <h1 className="text-5xl sm:text-6xl font-black mb-6">
            <span className="text-white">Your Brand,</span>
            <br />
            <span className="gradient-text">Perfectly Designed</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            From logo creation to full graphic design — we craft visuals that make your brand
            stand out, both online and in print.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#f59e0b] to-[#d97706] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#f59e0b]/20 hover:-translate-y-1 transition-all"
            >
              Get a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#graphic-design"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 text-gray-300 font-bold rounded-xl hover:border-white/20 hover:text-white transition-all"
            >
              Graphic Design <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Logo Design Features */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white mb-3">
            Logo <span className="gradient-text">Design</span>
          </h2>
          <p className="text-gray-400">Professional logos that define your brand identity</p>
        </div>
        <div ref={logoFeaturesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {logoFeatures.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-card rounded-2xl p-6 border border-[#f59e0b]/10 hover:border-[#f59e0b]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[#f59e0b]" />
              </div>
              <h3 className="text-white font-bold mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Graphic Design */}
      <section id="graphic-design" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ec4899]/5 rounded-full blur-3xl pointer-events-none" />
        <div ref={graphicHeadingRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ec4899]/10 border border-[#ec4899]/20 text-sm text-[#ec4899] font-medium mb-6">
            <PenTool className="w-4 h-4" />
            Graphic Design
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Visual Design for <span className="gradient-text">Every Need</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Beyond logos — we create all the visual assets your brand needs to look
            professional and consistent across every touchpoint.
          </p>
        </div>
        <div ref={graphicGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {graphicServices.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="glass-card rounded-2xl p-7 border border-white/6 hover:border-opacity-40 transition-all group"
              style={{ '--hover-color': color } as React.CSSProperties}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ background: `${color}18` }}
              >
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={industriesRef} className="text-center">
          <h2 className="text-3xl font-black text-white mb-4">Industries We Serve</h2>
          <p className="text-gray-400 mb-10">We&apos;ve created designs for businesses across many industries.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind) => (
              <div key={ind} className="px-5 py-2.5 rounded-full bg-white/4 border border-white/8 text-gray-300 text-sm hover:border-[#f59e0b]/30 hover:text-[#f59e0b] transition-all cursor-default">
                {ind}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
