'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, ArrowRight, PhoneCall } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="cta-content relative rounded-3xl overflow-hidden">
          {/* BG gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#05CCF7]/15 via-[#6366f1]/10 to-[#f59e0b]/10" />
          <div className="absolute inset-0 border border-[#05CCF7]/20 rounded-3xl" />

          {/* Glow orbs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#05CCF7]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#6366f1]/10 rounded-full blur-3xl" />

          <div className="relative z-10 p-10 md:p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#05CCF7] to-[#6366f1] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#05CCF7]/30">
              <Zap className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
              <span className="text-white">Ready to Launch</span>
              <br />
              <span className="gradient-text">Your Website?</span>
            </h2>

            <p className="text-gray-300 text-lg max-w-2xl mb-10 leading-relaxed mx-auto">
              Join thousands of businesses across Bangladesh who trust RaishaHost for their online presence.
              Get started today with our 30-day money-back guarantee.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#pricing"
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#05CCF7] to-[#0284c7] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#05CCF7]/30 hover:-translate-y-1 transition-all duration-300"
              >
                <Zap className="w-5 h-5" />
                Start Hosting Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <PhoneCall className="w-5 h-5" />
                Talk to Sales
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <span>✓ 30-Day Money Back</span>
              <span>✓ Free SSL Certificate</span>
              <span>✓ 99.9% Uptime SLA</span>
              <span>✓ 24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
