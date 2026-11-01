import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'
import PolicyDoc, { type PolicySection } from '@/components/site/PolicyDoc'
import { localPath, pageMeta, type Lang } from '@/i18n'

const meta = {
  en: {
    title: 'Terms & Conditions',
    description:
      'RaishaHost terms and conditions: acceptable use, network security, server resources, spam, support, domains, backups, refunds and liability. Please read before using our services.',
  },
  bn: {
    title: 'শর্তাবলী',
    description:
      'RaishaHost-এর শর্তাবলী: গ্রহণযোগ্য ব্যবহার, নেটওয়ার্ক নিরাপত্তা, সার্ভার রিসোর্স, স্প্যাম, সাপোর্ট, ডোমেইন, ব্যাকআপ, রিফান্ড ও দায়বদ্ধতা। আমাদের সার্ভিস ব্যবহারের আগে পড়ুন।',
  },
}

function sections(lang: Lang): PolicySection[] {
  const L = (h: string) => localPath(h, lang)
  if (lang === 'bn') {
    return [
      {
        id: 'content',
        title: 'আপনার কনটেন্ট',
        content: (
          <>
            <p>আমাদের সার্ভিস শুধু বৈধ কাজে ব্যবহার করুন। মানহানিকর, অপমানজনক, অশ্লীল, হুমকিমূলক, অন্যের অধিকার লঙ্ঘনকারী বা কোনো আইন ভঙ্গ করে এমন কনটেন্ট প্রকাশ করবেন না। আমাদের নেটওয়ার্কের মাধ্যমে আপনি যা প্রকাশ করেন তার সব দায় আপনার।</p>
            <p>নেটওয়ার্ক নজরদারি করা আমাদের বাধ্যবাধকতা নয়, তবে নিয়ম ভাঙে এমন কনটেন্টের কথা জানলে আমরা তা সম্পাদনা, সরিয়ে ফেলা বা বন্ধ করতে পারি। আইন, নিয়ন্ত্রক সংস্থা বা আদালত চাইলে আমরা কনটেন্ট বা রেকর্ড দিতে পারি।</p>
            <p>এগুলো কখনোই অনুমোদিত নয়:</p>
            <ul>
              <li>পাইরেটেড সফটওয়্যার (ওয়ারেজ): কপিরাইটযুক্ত সফটওয়্যার যা বিতরণের অনুমতি নেই।</li>
              <li>কপিরাইট লঙ্ঘন, যা দেওয়ানি ও ফৌজদারি দায় তৈরি করতে পারে।</li>
              <li>হ্যাকিং, ভাইরাস বা অন্য ওয়েবসাইটের ইচ্ছাকৃত ক্ষতির প্রচার করে এমন সাইট।</li>
            </ul>
          </>
        ),
      },
      {
        id: 'security',
        title: 'নেটওয়ার্ক নিরাপত্তা',
        content: (
          <>
            <p>কোনো হোস্ট, নেটওয়ার্ক বা অ্যাকাউন্টের নিরাপত্তা এড়ানোর চেষ্টা করবেন না। এর মধ্যে রয়েছে আপনার নয় এমন ডেটায় প্রবেশ, অনুমতি ছাড়া সার্ভারে লগইন, পাসওয়ার্ড ভাঙা বা অন্য নেটওয়ার্কের দুর্বলতা খোঁজা।</p>
            <p>আমরা আইন প্রয়োগকারী সংস্থার সাথে পুরোপুরি সহযোগিতা করি। সিস্টেম বা নেটওয়ার্কের নিরাপত্তা ভাঙলে দেওয়ানি বা ফৌজদারি দায় হতে পারে।</p>
          </>
        ),
      },
      { id: 'resources', title: 'সার্ভার রিসোর্স', content: <p>কোনো অ্যাকাউন্ট সার্ভারের রিসোর্সের (CPU, মেমরি বা নেটওয়ার্ক) অন্যায্য অংশ ব্যবহার করলে আমরা প্ল্যান আপগ্রেড করতে অথবা ব্যবহার কমাতে বলব।</p> },
      { id: 'spam', title: 'স্প্যাম', content: <p>আমাদের নেটওয়ার্ক ব্যবহার করে স্প্যাম, মেইল বোম্ব বা এ ধরনের অনাকাঙ্ক্ষিত ইমেইল পাঠাবেন না। স্প্যাম করলে আমরা আগাম সতর্কতা ছাড়াই আপনার ডোমেইন বন্ধ বা অ্যাকাউন্ট বাতিল করতে পারি, এবং প্রতিটি লঙ্ঘনের জন্য জরিমানা নিতে পারি।</p> },
      { id: 'support', title: 'টেকনিক্যাল সাপোর্ট', content: <p>প্রত্যেক ক্লায়েন্টকে আমরা আমাদের সার্ভিসের টেকনিক্যাল সাপোর্ট দিই। প্রোগ্রামিং, HTML কোড, কাস্টম কোড বা আমাদের ইনস্টল না করা থার্ড-পার্টি সফটওয়্যারের সাপোর্ট আমরা দিই না।</p> },
      { id: 'domains', title: 'ডোমেইন নাম', content: <p>ডোমেইন রেজিস্ট্রেশন ও রিনিউয়ে ছাড় বা ফ্রি অফার শুধু আপনার হোস্টিং চালু থাকা পর্যন্ত প্রযোজ্য। হোস্টিং বাতিল বা মেয়াদ শেষ হওয়ার পর ডোমেইন অন্য রেজিস্ট্রার বা হোস্টে নিতে চাইলে, আপনি যা দিয়েছেন আর ডোমেইনের পুরো দামের পার্থক্য আগে পরিশোধ করতে হবে।</p> },
      { id: 'refusal', title: 'সার্ভিস প্রত্যাখ্যান', content: <p>আমরা নিজেদের বিবেচনায় সার্ভিস দিতে অস্বীকার বা বাতিল করতে পারি। এই নিয়ম ভাঙলে সতর্কতা, স্থগিত বা অ্যাকাউন্ট বন্ধ হতে পারে। নিয়ম ভাঙার কারণে বন্ধ হওয়া অ্যাকাউন্টে রিফান্ড দেওয়া হয় না।</p> },
      { id: 'backups', title: 'ব্যাকআপ', content: <p>কোনো সার্ভিসের সাথে ব্যাকআপ অন্তর্ভুক্ত নয়। নিজের ব্যাকআপ রাখা, এবং তা আমাদের সার্ভারের বাইরে সংরক্ষণ করা আপনার দায়িত্ব। সার্ভার ব্যাকআপ থাকবেই এমন নিশ্চয়তা আমরা দিই না, এবং হারানো ডেটার জন্য দায়ী নই।</p> },
      {
        id: 'refunds',
        title: 'রিফান্ড',
        content: (
          <p>
            শেয়ার্ড, VPS ও রিসেলার হোস্টিংয়ের হোস্টিং ফিতে ৩০ দিনের মানি-ব্যাক গ্যারান্টি আছে। ডোমেইন, সেটআপ ফি, পেমেন্ট ফি, অ্যাড-অন এবং ডিজাইন বা ডেভেলপমেন্টের কাজ ফেরতযোগ্য নয়। পুরো <Link href={L('/money-back')}>মানি-ব্যাক নীতি</Link> দেখুন।
          </p>
        ),
      },
      { id: 'abuse', title: 'সম্মানজনক আচরণ', content: <p>আমাদের প্রতিষ্ঠান বা কর্মীদের প্রতি অপমানজনক ভাষা বা আচরণ আমরা গ্রহণ করি না। আমাদের বিবেচনায় অপমানজনক অ্যাকাউন্ট রিফান্ড ছাড়াই তাৎক্ষণিকভাবে বন্ধ করা হতে পারে।</p> },
      { id: 'liability', title: 'দায়বদ্ধতার সীমা', content: <p>সার্ভিস ব্যবহারের কারণে লাভের ক্ষতি বা পরোক্ষ, আনুষঙ্গিক, বিশেষ বা পরিণামগত ক্ষতির জন্য RaishaHost দায়ী নয়। আমাদের মোট দায় সার্ভিসের ৩০ দিনের জন্য আপনার দেওয়া অর্থের মধ্যে সীমিত।</p> },
      {
        id: 'privacy',
        title: 'গোপনীয়তা',
        content: (
          <p>
            আপনার দেওয়া ব্যক্তিগত তথ্য আমরা গোপন রাখি এবং শুধু আমাদের সার্ভিস দেওয়ার কাজে ব্যবহার করি। আইনের প্রয়োজন ছাড়া আপনার সম্মতি ছাড়া তা কোনো তৃতীয় পক্ষকে দিই না। আমাদের <Link href={L('/privacy')}>গোপনীয়তা নীতি</Link> পড়ুন।
          </p>
        ),
      },
    ]
  }
  return [
    {
      id: 'content',
      title: 'Your content',
      content: (
        <>
          <p>Use our services for lawful purposes only. Do not publish content that is defamatory, abusive, obscene, threatening, infringes someone else&apos;s rights or breaks any law. You are responsible for everything you make available through our network.</p>
          <p>We do not have to monitor the network, but if we learn about content that breaks these rules we may edit, remove or block it. We may share content or records when the law, a regulator or a court requires it.</p>
          <p>These are never allowed:</p>
          <ul>
            <li>Pirated software (warez): copyrighted software that is not free to distribute.</li>
            <li>Copyright violations, which can lead to civil and criminal liability.</li>
            <li>Sites that promote hacking, viruses or deliberate harm to other websites.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'security',
      title: 'Network security',
      content: (
        <>
          <p>Do not try to get around the security of any host, network or account. This includes accessing data that is not yours, logging in to servers without permission, cracking passwords or probing other networks for weaknesses.</p>
          <p>We cooperate fully with law enforcement. Breaking system or network security can lead to criminal or civil liability.</p>
        </>
      ),
    },
    { id: 'resources', title: 'Server resources', content: <p>If an account uses an unfair share of server resources (CPU, memory or network), we will ask you to either upgrade your plan or reduce the usage.</p> },
    { id: 'spam', title: 'Spam', content: <p>Do not use our network to send spam, mail bombs or similar unwanted email. If you spam, we may disable your domain or close your account without warning, and we may charge a penalty for each violation.</p> },
    { id: 'support', title: 'Technical support', content: <p>We provide technical support for our services to every client. We do not support programming, HTML code, custom code or third-party software that we did not install.</p> },
    { id: 'domains', title: 'Domain names', content: <p>Discounts or free domain registrations and renewals apply only while your hosting is active. If your hosting is cancelled or expires and you move the domain to another registrar or host, you must first pay the difference between what you paid and the full price of the domain.</p> },
    { id: 'refusal', title: 'Refusing service', content: <p>We may refuse or cancel service at our own discretion. Breaking these rules can lead to a warning, suspension or account closure. Accounts closed for breaking the rules are not refunded.</p> },
    { id: 'backups', title: 'Backups', content: <p>Backups are not part of any service. Keeping your own backups, stored away from our servers, is your responsibility. We do not guarantee that server backups exist and are not responsible for lost data.</p> },
    {
      id: 'refunds',
      title: 'Refunds',
      content: (
        <p>
          Shared, VPS and reseller hosting come with a 30-day money-back guarantee on the hosting fee. Domains, setup fees, payment fees, add-ons and design or development work are not refunded. See the full <Link href={L('/money-back')}>money-back policy</Link>.
        </p>
      ),
    },
    { id: 'abuse', title: 'Respectful behaviour', content: <p>We do not accept abusive language or behaviour towards our company or our staff. Accounts we judge to be abusive may be closed immediately, without a refund.</p> },
    { id: 'liability', title: 'Limitation of liability', content: <p>RaishaHost is not responsible for lost profit or for indirect, incidental, special or consequential damages from using the service. Our total liability is limited to the amount you paid for 30 days of the service.</p> },
    {
      id: 'privacy',
      title: 'Privacy',
      content: (
        <p>
          We keep the personal information you give us confidential and use it only to provide our services. We do not share it with third parties without your consent, unless the law requires it. Read our <Link href={L('/privacy')}>privacy policy</Link>.
        </p>
      ),
    },
  ]
}

const head = {
  en: { kicker: 'Legal', h1: <>Terms &amp; <em className='sky'>conditions.</em></>, lede: 'The rules for using RaishaHost services. By ordering or using a service you agree to these terms.' },
  bn: { kicker: 'আইনি', h1: <><em className='sky'>শর্তাবলী।</em></>, lede: 'RaishaHost-এর সার্ভিস ব্যবহারের নিয়ম। কোনো সার্ভিস অর্ডার বা ব্যবহার করলে আপনি এই শর্তগুলো মেনে নিচ্ছেন।' },
}

export const termsMetadata = (lang: Lang) => pageMeta('/terms-conditions', lang, meta[lang])

export default function TermsView({ lang }: { lang: Lang }) {
  const h = head[lang]
  return (
    <InnerPage lang={lang} kicker={h.kicker} title={h.h1} lede={h.lede}>
      <PolicyDoc lang={lang} sections={sections(lang)} />
    </InnerPage>
  )
}
