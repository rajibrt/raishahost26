import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import type { Metadata } from 'next'
import { Shield, Clock, Users, Award, HeadphonesIcon, Globe } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us — RaishaHost Since 2008',
  description:
    'RaishaHost is a Bangladesh-based web hosting and digital services company established in 2008. Learn about our mission, 99.9% uptime guarantee, 24/7 support, and thousands of happy clients.',
  alternates: { canonical: 'https://raishahost.com/about' },
  openGraph: {
    title: 'About RaishaHost — Trusted Web Hosting Since 2008',
    description:
      'Bangladesh-based web hosting company since 2008. 99.9% uptime, free SSL, 24/7 support, and thousands of satisfied clients.',
    url: 'https://raishahost.com/about',
  },
}

const features = [
  { icon: Shield, title: '99.9% Uptime Guarantee', desc: 'আমাদের সার্ভার সর্বদা চালু থাকে। আপনার ওয়েবসাইট ২৪/৭ লাইভ রাখা আমাদের প্রতিশ্রুতি।', color: '#05CCF7' },
  { icon: HeadphonesIcon, title: '24/7 Support', desc: 'আমাদের ইন-হাউস সাপোর্ট টিম যেকোনো সমস্যায় দিনরাত সহায়তা করতে প্রস্তুত।', color: '#6366f1' },
  { icon: Clock, title: 'Since 2008', desc: '১৫+ বছর ধরে বাংলাদেশে বিশ্বস্ত ওয়েব হোস্টিং ও ডিজিটাল সেবা প্রদান করে আসছি।', color: '#f59e0b' },
  { icon: Globe, title: 'cPanel Hosting', desc: 'সহজ cPanel কন্ট্রোল প্যানেল দিয়ে আপনার ওয়েবসাইট ও ইমেইল সহজেই পরিচালনা করুন।', color: '#10b981' },
  { icon: Award, title: 'Free SSL Certificate', desc: 'সকল হোস্টিং প্ল্যানে বিনামূল্যে SSL সার্টিফিকেট — আপনার সাইট নিরাপদ রাখুন।', color: '#ec4899' },
  { icon: Users, title: 'Thousands of Clients', desc: 'বাংলাদেশ জুড়ে হাজার হাজার সন্তুষ্ট গ্রাহক আমাদের সেরা পুরস্কার।', color: '#8b5cf6' },
]

const testimonials = [
  { text: 'Thanks for the quick response. The support team continues to exceed my expectations. Keep up the good work.', name: 'Jim J.', role: 'CEO' },
  { text: "You've proven a great exception to the rule. I greatly appreciate your responsiveness — having been a long-time Internet user, I rarely expect much from customer support. RaishaHost proved me wrong.", name: 'Wayne', role: 'CEO' },
  { text: 'I would like to thank you for your fast response time when I needed help, and for the many options you offer. I will continue to recommend you to clients who need a highly professional web service provider.', name: 'M L Shannon', role: 'Director' },
]

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 bg-[#05CCF7]/8 rounded-full blur-3xl pointer-events-none" />
        <ScrollReveal className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" y={60} start="top 90%">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#05CCF7]/10 border border-[#05CCF7]/20 text-sm text-[#05CCF7] font-medium mb-6">
            আমাদের সম্পর্কে
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            About <span className="gradient-text">RaishaHost</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto font-bn">
            ২০০৮ সাল থেকে বাংলাদেশে সাশ্রয়ী মূল্যে বিশ্বমানের ওয়েব হোস্টিং, ডোমেইন রেজিস্ট্রেশন,
            ওয়েব ডিজাইন ও ডিজিটাল সেবা প্রদান করে আসছি।
          </p>
        </ScrollReveal>
      </section>

      {/* Story */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="glass-card rounded-2xl p-10 border border-white/6">
            <h2 className="text-3xl font-black text-white mb-6">আমাদের গল্প</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed font-bn">
              <p>
                RaishaHost ২০০৮ সালে প্রতিষ্ঠিত হয়েছিল একটি লক্ষ্য নিয়ে — বাংলাদেশের ব্যবসায়ী ও ব্যক্তিদের কাছে সাশ্রয়ী মূল্যে বিশ্বমানের ওয়েব হোস্টিং সেবা পৌঁছে দেওয়া। বছরের পর বছর ধরে আমরা হাজার হাজার গ্রাহকের ডিজিটাল স্বপ্ন পূরণে সহায়তা করেছি।
              </p>
              <p>
                আমরা বিশ্বাস করি প্রতিটি ব্যবসার — ছোট হোক বা বড় — ইন্টারনেটে একটি শক্তিশালী উপস্থিতি থাকা উচিত। তাই আমরা শুধু হোস্টিং সেবা নয়, ওয়েব ডিজাইন, লোগো ডিজাইন, সফটওয়্যার ডেভেলপমেন্ট এবং ডিজিটাল মার্কেটিং সেবাও প্রদান করি।
              </p>
              <p>
                আমাদের অভিজ্ঞ ও নিবেদিত সাপোর্ট টিম সর্বদা আপনার পাশে আছে। যেকোনো সমস্যায় আমরা দ্রুত ও কার্যকর সমাধান দিতে প্রতিশ্রুতিবদ্ধ।
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Features */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl font-black text-white">
            কেন <span className="gradient-text">RaishaHost</span> বেছে নেবেন?
          </h2>
        </ScrollReveal>
        <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1} start="top 80%">
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="glass-card rounded-2xl p-7 border border-white/6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${color}18` }}>
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-bn">{desc}</p>
            </div>
          ))}
        </ScrollReveal>
      </section>

      {/* Testimonials */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl font-black text-white">আমাদের গ্রাহকরা যা বলেন</h2>
        </ScrollReveal>
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12} start="top 80%">
          {testimonials.map((t) => (
            <div key={t.name} className="testimonial-card rounded-2xl p-7">
              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
              <div>
                <div className="text-white font-semibold text-sm">{t.name}</div>
                <div className="text-[#05CCF7] text-xs">{t.role}</div>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-3xl font-black text-white mb-4">আজই শুরু করুন</h2>
          <p className="text-gray-400 mb-8 font-bn">আপনার ডিজিটাল যাত্রা শুরু করতে আমাদের সাথে যোগাযোগ করুন।</p>
          <Link href="/contact" className="btn-primary">
            যোগাযোগ করুন
          </Link>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
  )
}
