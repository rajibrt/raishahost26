'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
    );

    gsap.fromTo(
      infoRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: infoRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    );

    gsap.fromTo(
      formRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#05CCF7]/8 rounded-full blur-3xl pointer-events-none" />

        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#05CCF7]/10 border border-[#05CCF7]/20 text-sm text-[#05CCF7] font-medium mb-6">
            <Mail className="w-4 h-4" />
            Contact Us
          </div>
          <h1 className="text-5xl sm:text-6xl font-black mb-6">
            <span className="text-white">Get in </span>
            <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have questions? Need a custom quote? Our team is ready to help you build your online presence.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Reach us via phone, email, or submit a ticket through our client portal.
                We typically respond within 2–4 hours during business hours.
              </p>
            </div>

            {[
              { icon: Phone, label: 'Phone', value: '+880 1711 380 679', href: 'tel:+8801711380679' },
              { icon: Phone, label: 'Phone 2', value: '+880 18 7803 7803', href: 'tel:+8801878037803' },
              { icon: Mail, label: 'Email', value: 'info@raishahost.com', href: 'mailto:info@raishahost.com' },
              { icon: MapPin, label: 'Location', value: 'Bangladesh', href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#05CCF7]/10 border border-[#05CCF7]/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#05CCF7]" />
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-0.5">{label}</div>
                  {href ? (
                    <a href={href} className="text-white font-medium hover:text-[#05CCF7] transition-colors text-sm">
                      {value}
                    </a>
                  ) : (
                    <div className="text-white font-medium text-sm">{value}</div>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#05CCF7]/10 border border-[#05CCF7]/20 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#05CCF7]" />
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Business Hours</div>
                  <div className="text-white font-medium text-sm">10am – 8pm (General)</div>
                  <div className="text-gray-400 text-xs mt-0.5">Admin: 9am – 4pm</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div ref={formRef} className="lg:col-span-3">
            <div className="glass-card rounded-2xl p-8 border border-white/5">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-3">Message Sent!</h3>
                  <p className="text-gray-400">We&apos;ll get back to you within 2–4 hours during business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-xl font-bold text-white mb-6">Send us a Message</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none focus:border-[#05CCF7]/40 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none focus:border-[#05CCF7]/40 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="How can we help?"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none focus:border-[#05CCF7]/40 focus:bg-white/[0.06] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Message</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your project or question..."
                      rows={6}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none focus:border-[#05CCF7]/40 focus:bg-white/[0.06] transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#05CCF7] to-[#0284c7] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#05CCF7]/20 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
