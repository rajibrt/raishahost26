'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Shield,
  Zap,
  Lock,
  HeadphonesIcon,
  Globe,
  Server,
  RefreshCw,
  BarChart3,
  Cpu,
  Database,
  Mail,
  Boxes,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Zap,
    title: 'NVMe SSD Storage',
    description: 'Blazing-fast NVMe SSD drives deliver up to 10x faster loading speeds than traditional HDD hosting.',
    color: '#f59e0b',
    gradient: 'from-amber-500/20 to-amber-500/5',
    border: 'border-amber-500/20',
  },
  {
    icon: Shield,
    title: 'Free SSL Certificate',
    description: "Every hosting plan includes a free SSL certificate to keep your visitors' data secure and boost SEO.",
    color: '#10b981',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/20',
  },
  {
    icon: Lock,
    title: 'Automated Malware Scan',
    description: 'Daily automated malware scanning and removal protects your website from threats around the clock.',
    color: '#6366f1',
    gradient: 'from-indigo-500/20 to-indigo-500/5',
    border: 'border-indigo-500/20',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Expert Support',
    description: 'Our knowledgeable support team is available 24/7 via live chat, ticket, and phone to help you succeed.',
    color: '#05CCF7',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
    border: 'border-cyan-500/20',
  },
  {
    icon: Server,
    title: 'cPanel Control Panel',
    description: 'Industry-leading cPanel makes managing your hosting easy — one-click installs, email, databases and more.',
    color: '#ec4899',
    gradient: 'from-pink-500/20 to-pink-500/5',
    border: 'border-pink-500/20',
  },
  {
    icon: Globe,
    title: '99.9% Uptime SLA',
    description: 'We guarantee 99.9% uptime on all hosting plans, backed by enterprise-grade infrastructure.',
    color: '#14b8a6',
    gradient: 'from-teal-500/20 to-teal-500/5',
    border: 'border-teal-500/20',
  },
  {
    icon: Mail,
    title: 'Professional Email',
    description: 'Create professional email accounts with your domain name. IMAP/POP3 support included.',
    color: '#f97316',
    gradient: 'from-orange-500/20 to-orange-500/5',
    border: 'border-orange-500/20',
  },
  {
    icon: Database,
    title: 'MySQL Databases',
    description: 'Unlimited MySQL databases with phpMyAdmin for easy database management on all plans.',
    color: '#8b5cf6',
    gradient: 'from-violet-500/20 to-violet-500/5',
    border: 'border-violet-500/20',
  },
  {
    icon: RefreshCw,
    title: '30-Day Money Back',
    description: "Not satisfied? Get a full refund within 30 days — no questions asked. We stand behind our service.",
    color: '#05CCF7',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
    border: 'border-cyan-500/20',
  },
];

const highlights = [
  { icon: Cpu, value: '100%', label: 'SSD Storage' },
  { icon: BarChart3, value: '99.9%', label: 'Uptime' },
  { icon: Boxes, value: '1-Click', label: 'App Install' },
  { icon: Lock, value: 'FREE', label: 'SSL Cert' },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Highlight counters
      gsap.fromTo(
        '.highlight-item',
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.highlights-row',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Feature cards — stagger animation
      gsap.fromTo(
        '.feature-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: {
            amount: 0.8,
            from: 'start',
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax on the section background
      gsap.to('.features-bg-orb', {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">
      {/* Background elements */}
      <div className="features-bg-orb absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#05CCF7]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#05CCF7]/10 border border-[#05CCF7]/20 text-sm text-[#05CCF7] font-medium mb-6">
            <Zap className="w-4 h-4" />
            Why Choose RaishaHost
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">Everything You Need to</span>
            <br />
            <span className="gradient-text">Succeed Online</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            From domain registration to web design, we provide all the tools and support
            you need to build a powerful online presence.
          </p>
        </div>

        {/* Highlight stats */}
        <div className="highlights-row grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {highlights.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="highlight-item glass-card rounded-2xl p-6 text-center border border-[#05CCF7]/10 hover:border-[#05CCF7]/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#05CCF7]/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-[#05CCF7]" />
              </div>
              <div className="text-3xl font-black text-white mb-1">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        {/* Features grid */}
        <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, description, color, gradient, border }) => (
            <div
              key={title}
              className={`feature-card glass-card rounded-2xl p-6 border ${border} bg-gradient-to-br ${gradient} hover:scale-[1.02] transition-all duration-300 group cursor-default`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${color}15` }}
              >
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
