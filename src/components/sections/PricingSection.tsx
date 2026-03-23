'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Zap, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import BorderGlow from '@/components/ui/BorderGlow'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'Economy',
    price: 'Tk. 3,800',
    originalPrice: 'Tk. 4,600',
    period: '/year',
    description: 'Personal blogs, portfolios এবং ছোট ওয়েবসাইটের জন্য আদর্শ।',
    features: [
      '5 GB SSD Storage',
      '30 GB/mo Bandwidth',
      '3 Websites Hosted',
      '10 Sub Domains',
      '2 Addon Domains',
      '20 Email Accounts',
      'Free SSL Certificate',
      'cPanel Control Panel',
      'Email Autoresponders',
    ],
    cta: 'Order Now',
    href: 'https://hosting.raishahost.com/store/linux-shared-hosting/economy',
    featured: false,
    badge: null,
    color: '#6366f1',
  },
  {
    name: 'Standard',
    price: 'Tk. 6,000',
    originalPrice: 'Tk. 8,000',
    period: '/year',
    description: 'Growing business এবং একাধিক সাইটের জন্য সেরা পছন্দ।',
    features: [
      '10 GB SSD Storage',
      '60 GB/mo Bandwidth',
      '4 Websites Hosted',
      '20 Sub Domains',
      '3 Addon Domains',
      '50 Email Accounts',
      'Free SSL Certificate',
      'cPanel Control Panel',
      'Email Autoresponders',
    ],
    cta: 'Order Now',
    href: 'https://hosting.raishahost.com/store/linux-shared-hosting/standard',
    featured: true,
    badge: 'Most Popular',
    color: '#05CCF7',
  },
  {
    name: 'Pro',
    price: 'Tk. 12,000',
    originalPrice: 'Tk. 17,000',
    period: '/year',
    description: 'উচ্চ ট্র্যাফিক ও demanding প্রজেক্টের জন্য সর্বোচ্চ শক্তি।',
    features: [
      '30 GB SSD Storage',
      '100 GB/mo Bandwidth',
      '7 Websites Hosted',
      '20 Sub Domains',
      '6 Addon Domains',
      '100 Email Accounts',
      'Free SSL Certificate',
      'cPanel Control Panel',
      'Priority Support',
    ],
    cta: 'Order Now',
    href: 'https://hosting.raishahost.com/store/linux-shared-hosting/pro',
    featured: false,
    badge: 'Best Value',
    color: '#f59e0b',
  },
]

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pricing-heading',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pricing-heading',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      gsap.fromTo(
        '.pricing-card',
        { y: 80, opacity: 0, rotateX: 8 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pricing-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id='pricing'
      className='relative py-28 overflow-hidden'
    >
      {/* Background */}
      <div className='absolute inset-0 grid-pattern opacity-20 pointer-events-none' />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#6366f1]/5 rounded-full blur-3xl pointer-events-none' />

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Heading */}
        <div className='pricing-heading flex flex-col items-center text-center mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#05CCF7]/10 border border-[#05CCF7]/20 text-sm text-[#05CCF7] font-medium mb-6'>
            <Star className='w-4 h-4' />
            Hosting Plans
          </div>
          <h2 className='text-4xl sm:text-5xl md:text-6xl font-black mb-6'>
            <span className='text-white'>Simple, Transparent</span>
            <br />
            <span className='gradient-text'>Pricing Plans</span>
          </h2>
          <p className='text-gray-400 text-lg max-w-2xl'>
            No hidden fees. No surprises. Just reliable hosting at honest
            prices. All plans include cPanel, free SSL, and our 30-day
            money-back guarantee.
          </p>
        </div>

        {/* Plans grid */}
        <div
          className='pricing-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch'
          style={{ perspective: '1000px' }}
        >
          {plans.map((plan) => (
            <BorderGlow
              key={plan.name}
              glowColor={plan.color}
              edgeSensitivity={30}
              borderRadius='1rem'
              className='pricing-card flex flex-col'
            >
              <div
                className={`relative z-1 flex flex-col flex-1 rounded-2xl overflow-hidden ${
                  plan.featured
                    ? 'featured-card shadow-2xl shadow-[#05CCF7]/20 border-[#05CCF7]/40'
                    : 'glass-card'
                }`}
              >
              {/* Badge */}
              {plan.badge && (
                <div className='absolute top-4 right-4 z-10'>
                  <span
                    className='text-xs font-bold px-3 py-1 rounded-full text-white'
                    style={{
                      background: `linear-gradient(135deg, ${plan.color}, ${plan.color}88)`,
                    }}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className='p-7 flex flex-col flex-1'>
                {/* Plan name and color indicator */}
                <div className='flex items-center gap-3 mb-4'>
                  <div
                    className='w-10 h-10 rounded-xl flex items-center justify-center'
                    style={{ backgroundColor: `${plan.color}15` }}
                  >
                    <Zap className='w-5 h-5' style={{ color: plan.color }} />
                  </div>
                  <div>
                    <h3 className='text-white font-bold text-lg'>
                      {plan.name}
                    </h3>
                  </div>
                </div>

                <p className='text-gray-500 text-sm mb-6 leading-relaxed'>
                  {plan.description}
                </p>

                {/* Price */}
                <div className='mb-6'>
                  <div className='flex items-end gap-1'>
                    <span
                      className='text-5xl font-black'
                      style={{ color: plan.featured ? '#05CCF7' : 'white' }}
                    >
                      {plan.price}
                    </span>
                    <span className='text-gray-500 mb-2'>{plan.period}</span>
                  </div>
                  <div className='flex items-center gap-2 mt-1'>
                    <span className='text-base text-gray-500 line-through'>
                      {plan.originalPrice}
                    </span>
                    <span className='text-xs font-semibold px-2 py-0.5 rounded-full' style={{ background: `${plan.color}20`, color: plan.color }}>
                      Save {Math.round((1 - parseInt(plan.price.replace(/\D/g, '')) / parseInt(plan.originalPrice.replace(/\D/g, ''))) * 100)}%
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className='space-y-3 mb-8 flex-1'>
                  {plan.features.map((feature) => (
                    <li key={feature} className='flex items-start gap-2.5'>
                      <div
                        className='w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5'
                        style={{ backgroundColor: `${plan.color}20` }}
                      >
                        <Check
                          className='w-3 h-3'
                          style={{ color: plan.color }}
                        />
                      </div>
                      <span className='text-gray-300 text-sm'>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={plan.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 hover:gap-3 ${
                    plan.featured
                      ? 'bg-gradient-to-r from-[#05CCF7] to-[#0284c7] text-white shadow-lg shadow-[#05CCF7]/25 hover:shadow-[#05CCF7]/40'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className='w-4 h-4' />
                </a>
              </div>
              </div>
            </BorderGlow>
          ))}
        </div>

        {/* Bottom note */}
        <div className='text-center mt-12 text-gray-500 text-sm'>
          কাস্টম প্ল্যান দরকার?{' '}
          <Link href='/contact' className='text-[#05CCF7] hover:underline'>
            আমাদের সাথে যোগাযোগ করুন
          </Link>
          । সকল মূল্য BDT-তে। ৩০ দিনের মানি-ব্যাক গ্যারান্টি।
        </div>
      </div>
    </section>
  )
}
