import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import type { Metadata } from 'next'
import { Shield, Clock, HeadphonesIcon, Zap, Lock, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Guarantees — 99.9% Uptime, Money-Back & More',
  description:
    'RaishaHost guarantees: 99.9% uptime SLA, 30-day money-back, 24/7 technical support, free SSL, data security, and fast response times. Your business is protected.',
  alternates: { canonical: 'https://raishahost.com/guarantees' },
  openGraph: {
    title: 'RaishaHost Guarantees — Uptime, Money-Back & Support',
    description:
      '99.9% uptime guarantee, 30-day money-back, free SSL, 24/7 support, and data security — all backed by our service promise.',
    url: 'https://raishahost.com/guarantees',
  },
}

const guarantees = [
  {
    icon: Zap,
    title: '99.9% Uptime Guarantee',
    color: '#05CCF7',
    desc: 'আমরা গ্যারান্টি দিচ্ছি আপনার ওয়েবসাইট ৯৯.৯% সময় অনলাইন থাকবে। আমাদের উচ্চ-কার্যক্ষম SSD সার্ভার এবং রিডান্ড্যান্ট নেটওয়ার্ক অবকাঠামো নিশ্চিত করে যে আপনার ব্যবসা সর্বদা চলমান থাকে।',
  },
  {
    icon: RefreshCw,
    title: '30-Day Money Back Guarantee',
    color: '#6366f1',
    desc: 'নতুন হোস্টিং গ্রাহকদের জন্য আমরা ৩০ দিনের সম্পূর্ণ মানি-ব্যাক গ্যারান্টি প্রদান করি। যদি কোনো কারণে আপনি সন্তুষ্ট না হন, তাহলে ৩০ দিনের মধ্যে সম্পূর্ণ অর্থ ফেরত পাবেন — কোনো প্রশ্ন ছাড়াই।',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Technical Support',
    color: '#f59e0b',
    desc: 'আমাদের অভিজ্ঞ সাপোর্ট টিম সপ্তাহের ৭ দিন, ২৪ ঘণ্টা আপনার সেবায় প্রস্তুত। যেকোনো প্রযুক্তিগত সমস্যায় আমরা দ্রুততার সাথে সমাধান দিতে প্রতিশ্রুতিবদ্ধ।',
  },
  {
    icon: Lock,
    title: 'Free SSL Certificate',
    color: '#10b981',
    desc: 'সকল হোস্টিং প্ল্যানে বিনামূল্যে SSL সার্টিফিকেট অন্তর্ভুক্ত। এটি আপনার ওয়েবসাইট ও গ্রাহকদের তথ্য সুরক্ষিত রাখে এবং গুগল সার্চ র‌্যাংকিং উন্নত করতে সাহায্য করে।',
  },
  {
    icon: Shield,
    title: 'Data Security',
    color: '#ec4899',
    desc: 'আমরা কাটিং-এজ ম্যালওয়্যার মনিটরিং ও সুরক্ষা টুল ব্যবহার করি। আপনার ডেটা সুরক্ষিত রাখতে আমরা নিয়মিত সিকিউরিটি আপডেট ও স্ক্যান পরিচালনা করি।',
  },
  {
    icon: Clock,
    title: 'Fast Response Time',
    color: '#8b5cf6',
    desc: 'সাপোর্ট টিকেট সাধারণত কয়েক ঘণ্টার মধ্যে সমাধান করা হয়। জরুরি সমস্যায় আমরা আরও দ্রুত সাড়া দিই কারণ আপনার সময় ও ব্যবসা আমাদের কাছে গুরুত্বপূর্ণ।',
  },
]

export default function GuaranteesPage() {
  return (
    <main>
      <Navbar />

      <section className="relative pt-36 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 bg-[#6366f1]/8 rounded-full blur-3xl pointer-events-none" />
        <ScrollReveal className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" y={60} start="top 90%">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-sm text-[#6366f1] font-medium mb-6">
            <Shield className="w-4 h-4" />
            Our Guarantees
          </div>
          <h1 className="text-5xl font-black text-white mb-6">
            আমাদের <span className="gradient-text">প্রতিশ্রুতি</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed font-bn max-w-2xl mx-auto">
            RaishaHost-এ আমরা শুধু সেবা দিই না — আমরা প্রতিশ্রুতি দিই। আমাদের প্রতিটি সেবার সাথে
            যুক্ত আছে শক্তিশালী গ্যারান্টি যা আপনার ব্যবসাকে নিরাপদ রাখে।
          </p>
        </ScrollReveal>
      </section>

      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1} start="top 80%">
          {guarantees.map(({ icon: Icon, title, color, desc }) => (
            <div key={title} className="glass-card rounded-2xl p-8 border border-white/6 hover:border-opacity-40 transition-all">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${color}18` }}>
                <Icon className="w-7 h-7" style={{ color }} />
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-bn">{desc}</p>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-14 rounded-2xl p-10 border border-[#05CCF7]/20 text-center" style={{ background: 'linear-gradient(135deg, rgba(5,204,247,0.08), transparent)' }}>
            <h2 className="text-2xl font-black text-white mb-3">যেকোনো প্রশ্ন আছে?</h2>
            <p className="text-gray-400 mb-6 font-bn">আমাদের সাপোর্ট টিম সর্বদা আপনাকে সাহায্য করতে প্রস্তুত।</p>
            <Link href="/contact" className="btn-primary">
              Contact Support
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
  )
}
