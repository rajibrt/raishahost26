import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import type { Metadata } from 'next'
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '30-Day Money Back Guarantee',
  description:
    'RaishaHost offers a full 30-day money-back guarantee on all shared, VPS, and reseller hosting plans. No questions asked. Learn what is included and the conditions.',
  alternates: { canonical: 'https://raishahost.com/money-back' },
  openGraph: {
    title: '30-Day Money Back Guarantee | RaishaHost',
    description:
      'Full refund within 30 days on all hosting plans — no questions asked. Learn about what is covered and the simple refund process.',
    url: 'https://raishahost.com/money-back',
  },
}

const included = [
  'Shared hosting subscription fee (full refund)',
  'VPS hosting subscription fee (full refund)',
  'Reseller hosting subscription fee (full refund)',
]

const excluded = [
  'Domain registration, renewal, or transfer fees',
  'Setup fees',
  'Payment gateway fees',
  'Add-on services (SiteLock, SpamExperts, etc.)',
  'Web Design & Development services',
  'SEO, Maintenance, or Security services',
  'Any free domain/SSL included with a plan (will be suspended on refund)',
]

const conditions = [
  'অনুরোধটি রেজিস্ট্রেশনের প্রথম ৩০ দিনের মধ্যে করতে হবে।',
  'প্রতিটি ক্লায়েন্টের জন্য শুধুমাত্র প্রথম সার্ভিসে একবার প্রযোজ্য।',
  'পূর্বে মানি-ব্যাক নেওয়া থাকলে আর যোগ্য হবেন না।',
  'অ্যাকাউন্ট অবশ্যই ভেরিফাইড হতে হবে (সঠিক নাম ও প্রয়োজনীয় ডকুমেন্ট সহ)।',
  'পরিকল্পনার সাথে বিনামূল্যে প্রদত্ত ডোমেইন/SSL রিফান্ডের পর স্থগিত হবে।',
]

export default function MoneyBackPage() {
  return (
    <main>
      <Navbar />

      <section className="relative pt-36 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 bg-[#6366f1]/8 rounded-full blur-3xl pointer-events-none" />
        <ScrollReveal className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" y={60} start="top 90%">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-sm text-[#6366f1] font-medium mb-6">
            <RefreshCw className="w-4 h-4" />
            Refund Policy
          </div>
          <h1 className="text-5xl font-black text-white mb-6">
            <span className="gradient-text">30-Day</span> Money Back
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed font-bn max-w-2xl mx-auto">
            আমরা আমাদের সেবার মানের প্রতি এতটাই আত্মবিশ্বাসী যে রেজিস্ট্রেশনের ৩০ দিনের মধ্যে
            সম্পূর্ণ অর্থ ফেরতের গ্যারান্টি দিচ্ছি।
          </p>
        </ScrollReveal>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        <ScrollReveal>
          <div className="glass-card rounded-2xl p-8 border border-[#6366f1]/20">
            <h2 className="text-2xl font-bold text-white mb-5">গ্যারান্টি কীভাবে কাজ করে</h2>
            <div className="text-gray-400 text-sm leading-relaxed space-y-4 font-bn">
              <p>
                RaishaHost-এ আমরা প্রতিটি Shared, Reseller ও VPS হোস্টিং গ্রাহককে রেজিস্ট্রেশনের
                প্রথম ৩০ দিনের মধ্যে সম্পূর্ণ অর্থ ফেরতের সুযোগ দিচ্ছি। যদি আপনি আমাদের
                হোস্টিং সেবায় সন্তুষ্ট না হন, তাহলে আপনার সাবস্ক্রিপশন বাতিল করে সম্পূর্ণ
                অর্থ ফেরত নিন।
              </p>
              <p>
                রিফান্ড পেতে আপনাকে শুধু আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করতে হবে এবং
                রিফান্ডের অনুরোধ করতে হবে। আমরা দ্রুততার সাথে প্রক্রিয়া সম্পন্ন করব।
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.15} start="top 80%">
          <div className="glass-card rounded-2xl p-7 border border-[#10b981]/20">
            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#10b981]" />
              রিফান্ডযোগ্য
            </h3>
            <ul className="space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-7 border border-red-500/20">
            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" />
              রিফান্ডযোগ্য নয়
            </h3>
            <ul className="space-y-3">
              {excluded.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-400">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400/60 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="glass-card rounded-2xl p-8 border border-white/6">
            <h2 className="text-2xl font-bold text-white mb-5">শর্তাবলী</h2>
            <ul className="space-y-3">
              {conditions.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-400 font-bn">
                  <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'rgba(99,102,241,0.2)', color: '#6366f1' }}>
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-2xl p-10 border border-[#6366f1]/25 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08), transparent)' }}>
            <h2 className="text-2xl font-black text-white mb-3">রিফান্ডের জন্য আবেদন করুন</h2>
            <p className="text-gray-400 mb-6 font-bn">আমাদের সাপোর্ট টিমে যোগাযোগ করুন — আমরা দ্রুত সহায়তা করব।</p>
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
