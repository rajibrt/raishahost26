'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTASection from '@/components/sections/CTASection';
import {
  Monitor, Smartphone, Code, Globe, Layers, ArrowRight,
  ShoppingCart, BarChart2, Palette, Cpu, Check,
} from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Monitor,
    title: 'Web Design & Development',
    color: '#05CCF7',
    desc: 'Beautiful, responsive websites built with React, Next.js, WordPress and more. Optimized for speed, SEO, and conversions.',
    tags: ['React', 'Next.js', 'WordPress', 'SEO'],
  },
  {
    icon: Code,
    title: 'Web Application',
    color: '#6366f1',
    desc: 'Custom web apps with advanced functionality — dashboards, portals, booking systems, and any complex business logic.',
    tags: ['SaaS', 'Dashboard', 'Portal', 'API'],
  },
  {
    icon: Cpu,
    title: 'Software Development',
    color: '#f59e0b',
    desc: 'Full-cycle custom software development. Desktop apps, automation tools, ERP/CRM systems tailored to your business.',
    tags: ['Desktop App', 'ERP', 'CRM', 'Automation'],
  },
  {
    icon: BarChart2,
    title: 'Digital Marketing',
    color: '#10b981',
    desc: 'Grow your online presence with targeted campaigns — SEO, social media marketing, Google Ads, and content strategy.',
    tags: ['SEO', 'Google Ads', 'Social Media', 'Content'],
  },
  {
    icon: Palette,
    title: 'Graphics Design',
    color: '#ec4899',
    desc: 'Eye-catching brand visuals — logo design, social media graphics, banners, brochures, and complete brand identity.',
    tags: ['Logo', 'Branding', 'Social Media', 'Print'],
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Store',
    color: '#8b5cf6',
    desc: 'Full-featured online stores with product catalog, payment gateway, inventory management and order tracking.',
    tags: ['WooCommerce', 'Payment', 'Inventory', 'Orders'],
  },
];

const packages = [
  {
    name: 'Company Website',
    type: 'Basic',
    price: 'Tk. 7,500',
    color: '#05CCF7',
    features: [
      'Up to 5 Pages',
      'Responsive Design',
      'Contact Form',
      'SEO Optimization',
      'Social Media Integration',
      'Google Analytics',
      '3 Months Support',
    ],
  },
  {
    name: 'Company Website',
    type: 'Standard',
    price: 'Tk. 10,000',
    color: '#6366f1',
    featured: true,
    features: [
      'Up to 10 Pages',
      'Custom CMS',
      'Responsive Design',
      'Contact & Quote Forms',
      'Blog Section',
      'SEO + Analytics',
      'Social Media Integration',
      '6 Months Support',
    ],
  },
  {
    name: 'Newspaper Website',
    type: 'News Portal',
    price: 'Tk. 7,500',
    color: '#f59e0b',
    features: [
      'Breaking News Section',
      'Category Archive',
      'Search Feature',
      'Comment System',
      'Social Sharing',
      'Ad Management',
      'Responsive Design',
    ],
  },
  {
    name: 'Blogging Website',
    type: 'Blog',
    price: 'Tk. 7,500',
    color: '#10b981',
    features: [
      'Blog Post System',
      'Category & Tags',
      'Comment System',
      'Author Profiles',
      'Related Posts',
      'Search Feature',
      'Newsletter Integration',
    ],
  },
  {
    name: 'Educational Website',
    type: 'LMS',
    price: 'Tk. 10,000',
    color: '#ec4899',
    features: [
      'Course Management',
      'Student Portal',
      'Assignment Upload',
      'Progress Tracking',
      'Payment Integration',
      'Certificate Generation',
      'Admin Dashboard',
    ],
  },
  {
    name: 'Portfolio Website',
    type: 'Creative',
    price: 'Tk. 7,500',
    color: '#8b5cf6',
    features: [
      'Portfolio Gallery',
      'Project Showcase',
      'Client Testimonials',
      'Blog Section',
      'Contact Form',
      'Animated Design',
      'Social Links',
    ],
  },
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

export default function ServicesContent() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 });

    gsap.fromTo('.srv-card', { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.srv-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
    });

    gsap.fromTo('.tech-badge', { scale: 0.8, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'back.out(1.7)',
      scrollTrigger: { trigger: '.tech-row', start: 'top 85%', toggleActions: 'play none none reverse' },
    });

    gsap.fromTo('.pkg-card', { y: 60, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.pkg-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
    });
  }, []);

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#05CCF7]/8 rounded-full blur-3xl pointer-events-none" />
        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#05CCF7]/10 border border-[#05CCF7]/20 text-sm text-[#05CCF7] font-medium mb-6">
            <Smartphone className="w-4 h-4" />
            Our Services
          </div>
          <h1 className="text-5xl sm:text-6xl font-black mb-6">
            <span className="text-white">Everything You Need</span>
            <br />
            <span className="gradient-text">Under One Roof</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From stunning websites to powerful software, digital marketing to brand identity —
            we deliver complete digital solutions for your business.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">What We Do</h2>
          <p className="text-gray-500 text-base">Professional services tailored to your goals</p>
        </div>
        <div className="srv-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, color, desc, tags }) => (
            <div
              key={title}
              className="srv-card group glass-card rounded-2xl p-7 border border-white/5 hover:border-opacity-40 transition-all duration-300 hover:-translate-y-1"
              style={{ '--hover-color': color } as React.CSSProperties}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${color}18` }}>
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{desc}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: `${color}15`, color }}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link href="/contact" className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all" style={{ color }}>
                Get Quote <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="tech-row">
          <div className="text-center text-sm text-gray-500 mb-5">Technologies We Use</div>
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
      </section>

      {/* Website Packages */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-sm text-[#6366f1] font-medium mb-5">
              <Layers className="w-4 h-4" />
              Website Packages
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="text-white">Choose Your</span>{' '}
              <span className="gradient-text">Package</span>
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              All packages include responsive design, SEO optimization, and ongoing support.
            </p>
          </div>

          <div className="pkg-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map(({ name, type, price, color, features, featured }) => (
              <div
                key={`${name}-${type}`}
                className={`pkg-card rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 ${
                  featured
                    ? 'border-[#6366f1]/40 bg-gradient-to-br from-[#6366f1]/15 to-[#6366f1]/5 shadow-2xl shadow-[#6366f1]/20'
                    : 'border-white/[0.06] bg-white/[0.03]'
                }`}
              >
                {featured && (
                  <div className="text-center text-xs font-bold uppercase tracking-widest py-1.5 text-white" style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}>
                    Most Popular
                  </div>
                )}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}50)` }} />
                <div className="p-7">
                  <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color }}>{type}</div>
                  <h3 className="text-white font-bold text-xl mb-2">{name}</h3>
                  <div className="text-3xl font-black mb-6" style={{ color }}>{price}</div>
                  <ul className="space-y-2.5 mb-8">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${color}20` }}>
                          <Check className="w-3 h-3" style={{ color }} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all hover:gap-3"
                    style={featured ? { background: `linear-gradient(135deg, ${color}, ${color}99)`, color: 'white' } : { background: `${color}10`, color }}
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
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
