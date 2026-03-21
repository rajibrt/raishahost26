'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Server, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Server,
    title: 'Web Hosting',
    description:
      'Reliable Linux SSD shared hosting with cPanel, free SSL, email hosting, and automated backups. Plans starting at just $22/year.',
    features: ['cPanel Control Panel', 'Free SSL Certificate', 'SSD Storage', '24/7 Support'],
    href: '#pricing',
    cta: 'View Plans',
    color: '#05CCF7',
    bg: 'from-cyan-500/10 to-transparent',
  },
  {
    icon: Code,
    title: 'Web Design & Development',
    description:
      'Custom responsive websites built with React, NextJS, WordPress and more. From corporate sites to e-commerce platforms.',
    features: ['React / Next.js', 'WordPress / Drupal', 'E-commerce Stores', 'SEO Optimized'],
    href: '/web-design',
    cta: 'Explore Services',
    color: '#6366f1',
    bg: 'from-indigo-500/10 to-transparent',
  },
  {
    icon: Palette,
    title: 'Logo Design',
    description:
      'Professional logo design that represents your brand identity. Creative, unique, and memorable designs for all industries.',
    features: ['Custom Brand Identity', 'Multiple Revisions', 'All File Formats', '30-Day Guarantee'],
    href: '/logo-design',
    cta: 'View Portfolio',
    color: '#f59e0b',
    bg: 'from-amber-500/10 to-transparent',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-heading',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-heading',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.service-card',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="services-heading flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-sm text-[#6366f1] font-medium mb-6">
            <Code className="w-4 h-4" />
            Our Services
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">One Stop</span>{' '}
            <span className="gradient-text">Digital Solutions</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            From domain registration to full website development — we handle everything
            so you can focus on growing your business.
          </p>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, description, features, href, cta, color, bg }) => (
            <div
              key={title}
              className={`service-card relative rounded-2xl overflow-hidden bg-linear-to-br ${bg} border border-white/5 p-8 group hover:border-white/10 transition-all duration-300`}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at top left, ${color}10 0%, transparent 60%)`,
                }}
              />

              <div className="relative z-10">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color }} />
                </div>

                <h3 className="text-white font-bold text-2xl mb-3">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{description}</p>

                <ul className="space-y-2 mb-8">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 shrink-0" style={{ color }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={href}
                  className="inline-flex items-center gap-2 font-semibold text-sm transition-all duration-200 hover:gap-3"
                  style={{ color }}
                >
                  {cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
