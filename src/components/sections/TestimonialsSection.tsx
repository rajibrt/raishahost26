'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      'Thanks for the quick response. The support team at RaishaHost continues to exceed my expectations every single time. Their hosting is rock solid.',
    name: 'Jim J.',
    role: 'CEO',
    company: 'TechVentures Ltd.',
    rating: 5,
    initials: 'JJ',
    color: '#05CCF7',
  },
  {
    quote:
      "Thanks very much for your help. I've used a lot of hosting providers over the years, but you've proven to be a great exception. Highly recommended!",
    name: 'Wayne R.',
    role: 'CEO',
    company: 'Digital Works',
    rating: 5,
    initials: 'WR',
    color: '#6366f1',
  },
  {
    quote:
      'I will continue to recommend RaishaHost to clients who need a highly professional web service provider. Outstanding reliability and support.',
    name: 'M L Shannon',
    role: 'Director',
    company: 'Creative Agency',
    rating: 5,
    initials: 'MS',
    color: '#f59e0b',
  },
  {
    quote:
      'The website RaishaHost built for us is beautiful and loads incredibly fast. Our conversions went up 40% after the redesign. Best investment we made.',
    name: 'Rafiq A.',
    role: 'Founder',
    company: 'E-Shop BD',
    rating: 5,
    initials: 'RA',
    color: '#10b981',
  },
  {
    quote:
      'Migrating from our old host was seamless. The team handled everything and our site was back online in under 2 hours. Zero downtime business impact.',
    name: 'Sarah K.',
    role: 'Operations Manager',
    company: 'GlobalTrade Co.',
    rating: 5,
    initials: 'SK',
    color: '#ec4899',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-heading',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-heading',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.testimonial-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goTo = (index: number) => {
    const next = (index + testimonials.length) % testimonials.length;
    setCurrent(next);
    if (trackRef.current) {
      const cardWidth = trackRef.current.offsetWidth / 3;
      gsap.to(trackRef.current, {
        x: -next * cardWidth,
        duration: 0.6,
        ease: 'power3.inOut',
      });
    }
  };

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#05CCF7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="testimonials-heading flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-sm text-[#f59e0b] font-medium mb-6">
            <Star className="w-4 h-4 fill-[#f59e0b]" />
            What Clients Say
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">Trusted by</span>{' '}
            <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Don&apos;t just take our word for it — hear from some of our happy customers.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {testimonials.slice(0, 3).map((t, i) => (
            <div
              key={i}
              className="testimonial-card rounded-2xl p-7 bg-white/3 border border-white/6 hover:border-white/12 transition-all duration-300 flex flex-col gap-5 group hover:-translate-y-1"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-white/10 group-hover:text-white/20 transition-colors" />

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-gray-300 text-sm leading-relaxed flex-1 italic">&ldquo;{t.quote}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ backgroundColor: `${t.color}20`, border: `1px solid ${t.color}30` }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom two testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.slice(3).map((t, i) => (
            <div
              key={i}
              className="testimonial-card rounded-2xl p-7 bg-white/3 border border-white/6 hover:border-white/12 transition-all duration-300 flex flex-col gap-5 group hover:-translate-y-1"
            >
              <Quote className="w-8 h-8 text-white/10 group-hover:text-white/20 transition-colors" />
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ backgroundColor: `${t.color}20`, border: `1px solid ${t.color}30` }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl bg-white/3 border border-white/6">
            {[
              { value: '5K+', label: 'Happy Clients' },
              { value: '4.9/5', label: 'Average Rating' },
              { value: '15+', label: 'Years Serving' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-black text-[#05CCF7]">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
