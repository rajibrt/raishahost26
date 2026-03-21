import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'RaishaHost Terms and Conditions — acceptable use policy, network security, spam policy, domain policy, satisfaction guarantee, and more. Please read before using our services.',
  alternates: { canonical: 'https://raishahost.com/terms-conditions' },
  openGraph: {
    title: 'Terms & Conditions | RaishaHost',
    description:
      'RaishaHost usage policies including acceptable use, network security, spam policy, domain terms, and satisfaction guarantee.',
    url: 'https://raishahost.com/terms-conditions',
  },
}

const sections = [
  {
    title: 'User-Supplied Content',
    content: `All services may be used for lawful purposes only. You must not submit, publish, or display on the Network any defamatory, inaccurate, abusive, obscene, infringing, or threatening content. You may not submit content that violates any law. You are solely responsible for the content you make accessible through RaishaHost's Network.\n\nRaishaHost is not obligated to monitor the network, but if made aware of unacceptable content, RaishaHost has the right to edit, remove or deny access to such content. RaishaHost may disclose content or records as required to satisfy any law, regulation, or court order.`,
    list: [
      'Pirated Software (Warez) — Any copyrighted software not freely available for distribution.',
      'Copyright Violations — Violations can result in civil and criminal liability.',
      'Hacking/Phreaking — Sites promoting hacking, viruses, anarchy, or willful harm to Internet sites.',
    ],
  },
  {
    title: 'Network Security',
    content: `Customers may not attempt to circumvent user authentication or security of any host, network, or account. This includes accessing data not intended for the customer, logging into unauthorized servers, password cracking, or probing other networks for weakness.\n\nRaishaHost will cooperate fully with law enforcement in investigations of suspected criminal violations. Users who violate system or network security may incur criminal or civil liability.`,
  },
  {
    title: 'Server Resources',
    content: `Any account that uses an unfair amount of server resources (CPU time, memory usage, network resources) will be given the option to either upgrade their service level or reduce resource usage to an acceptable level.`,
  },
  {
    title: 'Commercial Advertising / Spam',
    content: `You must not use the RaishaHost Network in connection with the transmission of spam, flames, mail bombs, or substantially similar unsolicited email messages. If you are found to have spammed, RaishaHost reserves the right to disable your domain/terminate your account without warning. RaishaHost may impose a penalty for each spam policy violation.`,
  },
  {
    title: 'Technical Support',
    content: `RaishaHost provides technical support to all its clients. However, we do not provide support for programming, HTML code, custom programming, or 3rd Party Software not installed by RaishaHost.`,
  },
  {
    title: 'Domain Name Policy',
    content: `Discounts or free promotions for domain registrations/renewals are extended during your hosting period only. Once your hosting account is canceled or expires, if you choose to change domain registrars or hosting providers, the difference between the amount paid for your domain and the actual full cost is due before we will release the domain.`,
  },
  {
    title: 'Refusal of Service',
    content: `RaishaHost reserves the right at its sole discretion to refuse or cancel service. Violation of any RaishaHost Rules and Regulations could result in a warning, suspension, or account termination. Accounts terminated due to policy violations will not be refunded.`,
  },
  {
    title: 'Backups',
    content: `Backups are not included as part of any service. It is the customer's sole responsibility to make backups and save them off the server. The availability of server backups is not guaranteed and we are not responsible for the loss of customer data.`,
  },
  {
    title: 'Satisfaction Guarantee',
    content: `RaishaHost offers a money-back guarantee on web hosting services for the first 30 days of service. If you are not completely satisfied within the first 30 days, you will receive a full refund of the hosting amount, excluding setup fees, domain registration fees, and overages.`,
  },
  {
    title: 'Customer Abuse Policy',
    content: `We have zero-tolerance for abusive language or behavior towards our company, services, or employees. Any customer deemed abusive at our sole discretion will result in immediate irrevocable account termination without any refund.`,
  },
  {
    title: 'Limitation of Liability',
    content: `RaishaHost shall not be responsible for any loss-of-profit, indirect, incidental, special, or consequential damages arising out of the use of the service. The maximum liability of RaishaHost shall not exceed the actual price paid by the customer for thirty (30) days of service.`,
  },
  {
    title: 'Confidentiality',
    content: `All personal information submitted to us, including credit card information, will be kept strictly confidential and used solely by RaishaHost for the purposes for which it was intended. We agree not to share or release such information to any third party without the consent of the subscriber, except as required by law.`,
  },
]

export default function TermsPage() {
  return (
    <main>
      <Navbar />

      <section className="relative pt-36 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <ScrollReveal className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" y={60} start="top 90%">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-sm text-[#6366f1] font-medium mb-6">
            Legal
          </div>
          <h1 className="text-5xl font-black text-white mb-4">Terms & Conditions</h1>
          <p className="text-gray-400">
            At RaishaHost, we value our customers and wish to provide them with a positive experience.
            Please read these policies carefully before using our services.
          </p>
        </ScrollReveal>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {sections.map((sec, i) => (
            <ScrollReveal key={sec.title} delay={0} y={40}>
              <div className="glass-card rounded-2xl p-8 border border-white/6">
                <h2 className="text-xl font-bold text-white mb-4 pb-3 border-b border-white/7">{sec.title}</h2>
                <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-line mb-3">{sec.content}</div>
                {sec.list && (
                  <ul className="space-y-2 mt-4">
                    {sec.list.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-400">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6366f1] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="text-gray-600 text-xs text-center mt-10">
          RaishaHost reserves the right to amend or update these policies without notice.
          Failure to follow any terms may result in account deactivation or termination.
        </p>
      </section>

      <Footer />
    </main>
  )
}
