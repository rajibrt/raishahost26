'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from 'lucide-react'

const footerLinks = {
  Services: [
    { label: 'Web Hosting', href: '#pricing' },
    { label: 'Domain Registration', href: '/' },
    { label: 'Web Design', href: '/web-design' },
    { label: 'Logo & Graphic Design', href: '/logo-design' },
    { label: 'Website Packages', href: '/web-design/packages' },
  ],
  Support: [
    { label: 'Knowledge Base', href: '/knowledge' },
    {
      label: 'Submit a Ticket',
      href: 'https://raishahost.com/hosting/submitticket.php',
    },
    { label: 'Client Area', href: 'https://hosting.raishahost.com/login' },
    { label: 'Contact Us', href: '/contact' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Terms & Conditions', href: '/terms-conditions' },
    { label: 'Guarantees', href: '/guarantees' },
    { label: '30-Day Money Back', href: '/money-back' },
  ],
}

export default function Footer() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href.startsWith('http') || href.startsWith('#')) return false
    return href === '/' ? pathname === '/' : pathname.startsWith(href)
  }

  return (
    <footer className='relative border-t border-white/5 overflow-hidden'>
      {/* Background */}
      <div className='absolute inset-0 grid-pattern opacity-10 pointer-events-none' />

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Top section */}
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-12 py-16'>
          {/* Brand */}
          <div className='lg:col-span-2'>
            <Link href='/' className='inline-flex mb-6'>
              <Image
                src='/raisha-host-logo.svg'
                alt='RaishaHost'
                width={180}
                height={24}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Link>

            <p className='text-gray-500 text-sm leading-relaxed mb-6 max-w-xs'>
              Affordable Linux SSD web hosting in Bangladesh. Providing reliable
              hosting, domain registration, and web design services since 2008.
            </p>

            {/* Contact */}
            <div className='space-y-3 mb-6'>
              <a
                href='tel:+8801711380679'
                className='flex items-center gap-3 text-sm text-gray-400 hover:text-[#05CCF7] transition-colors'
              >
                <div className='w-8 h-8 rounded-lg bg-[#05CCF7]/10 flex items-center justify-center'>
                  <Phone className='w-4 h-4 text-[#05CCF7]' />
                </div>
                +880 1711 380 679
              </a>
              <a
                href='tel:+8801878037803'
                className='flex items-center gap-3 text-sm text-gray-400 hover:text-[#05CCF7] transition-colors'
              >
                <div className='w-8 h-8 rounded-lg bg-[#05CCF7]/10 flex items-center justify-center'>
                  <Phone className='w-4 h-4 text-[#05CCF7]' />
                </div>
                +880 18 7803 7803
              </a>
              <a
                href='mailto:info@raishahost.com'
                className='flex items-center gap-3 text-sm text-gray-400 hover:text-[#05CCF7] transition-colors'
              >
                <div className='w-8 h-8 rounded-lg bg-[#05CCF7]/10 flex items-center justify-center'>
                  <Mail className='w-4 h-4 text-[#05CCF7]' />
                </div>
                info@raishahost.com
              </a>
              <div className='flex items-center gap-3 text-sm text-gray-500'>
                <div className='w-8 h-8 rounded-lg bg-[#05CCF7]/10 flex items-center justify-center'>
                  <MapPin className='w-4 h-4 text-[#05CCF7]' />
                </div>
                Bangladesh
              </div>
            </div>

            {/* Social links */}
            <div className='flex items-center gap-3'>
              {[
                {
                  icon: Facebook,
                  href: 'https://facebook.com/RaishaHost',
                  color: '#1877f2',
                },
                {
                  icon: Twitter,
                  href: 'https://twitter.com/raishahost',
                  color: '#1da1f2',
                },
                {
                  icon: Youtube,
                  href: 'https://youtube.com/c/RaishaHost',
                  color: '#ff0000',
                },
              ].map(({ icon: Icon, href, color }) => (
                <a
                  key={href}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:border-white/20 transition-all hover:-translate-y-0.5'
                  style={{ color }}
                >
                  <Icon className='w-4 h-4' />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className='text-white font-semibold text-sm mb-5'>
                {category}
              </h4>
              <ul className='space-y-3'>
                {links.map(({ label, href }) => {
                  const isExternal = href.startsWith('http')
                  const active = isActive(href)
                  const cls = `text-sm transition-colors flex items-center gap-1 group ${active ? 'text-[#05CCF7] font-semibold' : 'text-gray-500 hover:text-[#05CCF7]'}`
                  const inner = (
                    <>
                      <ArrowRight className={`w-3 h-3 -ml-4 transition-all ${active ? 'opacity-100 ml-0' : 'opacity-0 group-hover:opacity-100 group-hover:ml-0'}`} />
                      {label}
                    </>
                  )
                  return (
                    <li key={label}>
                      {isExternal ? (
                        <a href={href} target='_blank' rel='noopener noreferrer' className={cls}>{inner}</a>
                      ) : (
                        <Link href={href} className={cls}>{inner}</Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Business hours */}
        <div className='py-6 border-t border-white/[0.05] border-b border-white/[0.05]'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse' />
              <span>
                Support Hours:{' '}
                <span className='text-gray-300'>10am – 8pm (General)</span>
              </span>
            </div>
            <div>
              Admin Hours: <span className='text-gray-300'>9am – 4pm</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className='py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600'>
          <div>
            © {new Date().getFullYear()} RaishaHost. All rights reserved. In
            business since 2008.
          </div>
          <div className='flex items-center gap-4'>
            <Link href='/' className='hover:text-gray-400 transition-colors'>
              Terms & Conditions
            </Link>
            <Link href='/' className='hover:text-gray-400 transition-colors'>
              Privacy Policy
            </Link>
            <Link href='/' className='hover:text-gray-400 transition-colors'>
              Guarantees
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
