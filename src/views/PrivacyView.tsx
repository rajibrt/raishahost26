import Link from 'next/link'
import InnerPage from '@/components/site/InnerPage'
import PolicyDoc, { type PolicySection } from '@/components/site/PolicyDoc'
import { CLIENT_AREA_URL } from '@/components/site/links'
import { localPath, pageMeta, type Lang } from '@/i18n'

const meta = {
  en: {
    title: 'Privacy Policy',
    description: 'How RaishaHost collects, uses and protects your personal information when you visit our website, contact us or use our hosting services.',
  },
  bn: {
    title: 'গোপনীয়তা নীতি',
    description: 'আমাদের ওয়েবসাইট ভিজিট, যোগাযোগ বা হোস্টিং সার্ভিস ব্যবহারের সময় RaishaHost কীভাবে আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার ও সুরক্ষা করে।',
  },
}

const head = {
  en: { kicker: 'Legal', h1: <>Privacy <em className='sky'>policy.</em></>, lede: 'What personal information we collect, why we collect it and how we keep it safe. Written in plain words.', updated: 'November 2026' },
  bn: { kicker: 'আইনি', h1: <>গোপনীয়তা <em className='sky'>নীতি।</em></>, lede: 'আমরা কোন ব্যক্তিগত তথ্য সংগ্রহ করি, কেন করি, আর কীভাবে নিরাপদ রাখি। সহজ ভাষায় লেখা।', updated: 'নভেম্বর ২০২৬' },
}

const client = (label: string) => (
  <a href={CLIENT_AREA_URL} target='_blank' rel='noopener noreferrer'>{label}</a>
)

function sections(lang: Lang): PolicySection[] {
  const contact = <Link href={localPath('/contact', lang)}>{lang === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন' : 'contact us'}</Link>
  if (lang === 'bn') {
    return [
      { id: 'who', title: 'আমরা কারা', content: <p>RaishaHost বাংলাদেশভিত্তিক একটি ওয়েব হোস্টিং ও ডিজিটাল সার্ভিস প্রতিষ্ঠান। এই নীতি এই ওয়েবসাইট (raishahost.com) এবং hosting.raishahost.com-এর ক্লায়েন্ট এরিয়ার জন্য প্রযোজ্য। গোপনীয়তা নিয়ে প্রশ্ন থাকলে {contact}।</p> },
      {
        id: 'collect',
        title: 'আমরা যা সংগ্রহ করি',
        content: (
          <>
            <p>আপনাকে উত্তর দিতে ও সার্ভিস দিতে যা দরকার, শুধু সেটুকুই সংগ্রহ করি:</p>
            <ul>
              <li><b>যোগাযোগ ফর্ম:</b> আপনার নাম, ইমেইল, বিষয় ও মেসেজ। স্প্যাম ঠেকাতে আমরা IP ঠিকানা, ব্রাউজারের তথ্য এবং IP থেকে আনুমানিক অবস্থানও রাখি।</li>
              <li><b>গ্রাহক:</b> অর্ডার করলে {client('ক্লায়েন্ট এরিয়ার')} বিলিং সিস্টেম আপনার নাম, যোগাযোগ ও বিলিংয়ের তথ্য, আপনার সার্ভিস ও সাপোর্ট টিকেট রাখে। ডোমেইন রেজিস্ট্রেশনে রেজিস্ট্রির চাওয়া মালিকের তথ্য লাগে।</li>
              <li><b>সার্ভার লগ:</b> সব ওয়েবসাইটের মতো আমাদের সার্ভারও নিরাপত্তা ও সমস্যা সমাধানের জন্য সাধারণ লগ রাখে (IP ঠিকানা, দেখা পেজ, সময়)।</li>
              <li><b>ফেসবুক মেসেঞ্জার:</b> আমাদের ফেসবুক পেজে মেসেজ দিলে আমরা আপনার ফেসবুক নাম ও আইডি, আর আপনার পাঠানো মেসেজ, ছবি ও ভয়েস মেসেজ পাই।</li>
            </ul>
          </>
        ),
      },
      {
        id: 'messenger',
        title: 'মেসেঞ্জার ও আমাদের AI সহকারী',
        content: (
          <>
            <p>আমাদের ফেসবুক পেজের মেসেজের প্রথম উত্তর দেয় একটি AI সহকারী, আর আমাদের টিমও একই কথোপকথন পড়ে উত্তর দিতে পারে।</p>
            <ul>
              <li>উত্তর লেখার জন্য আপনার মেসেজ একটি AI সার্ভিস প্রোভাইডারের কাছে পাঠানো হয়। একই কারণে ভয়েস মেসেজকে লেখায় বদলানো হয়, আর ছবির বর্ণনা লেখা হয়।</li>
              <li>সাম্প্রতিক কথোপকথন আমরা রাখি, যাতে সহকারী আপনার আগের প্রশ্ন মনে রাখতে পারে এবং আমাদের টিম ফলো-আপ করতে পারে।</li>
              <li>এই তথ্য শুধু আপনাকে উত্তর দিতে ও সার্ভিস দিতে ব্যবহার করি। বিজ্ঞাপনে ব্যবহার করি না, বিক্রিও করি না।</li>
              <li>সহকারী কখনো পাসওয়ার্ড, OTP বা কার্ড নম্বর চায় না। দয়া করে এগুলো পাঠাবেন না।</li>
            </ul>
          </>
        ),
      },
      {
        id: 'delete',
        title: 'আপনার তথ্য মুছে ফেলা',
        content: (
          <>
            <p>আপনার মেসেঞ্জার কথোপকথন বা আমাদের কাছে থাকা অন্য যেকোনো ব্যক্তিগত তথ্য মুছতে:</p>
            <ul>
              <li>মেসেঞ্জারে আমাদের ফেসবুক পেজে লিখুন &ldquo;Delete my data&rdquo;, অথবা আমাদের সাথে যে ইমেইল ব্যবহার করেছেন সেখান থেকে info@raishahost.com-এ ইমেইল করুন।</li>
              <li>৩০ দিনের মধ্যে মুছে ফেলে আপনাকে জানিয়ে দেব। আইন অনুযায়ী যে রেকর্ড রাখতে হয় (যেমন ইনভয়েস), সেগুলো শুধু আইন যত দিন চায় তত দিন রাখা হয়।</li>
            </ul>
          </>
        ),
      },
      {
        id: 'use',
        title: 'যেভাবে ব্যবহার করি',
        content: (
          <ul>
            <li>আপনার প্রশ্নের উত্তর ও সাপোর্ট দিতে।</li>
            <li>আপনার অর্ডার করা সার্ভিস সেটআপ, বিলিং ও পরিচালনা করতে।</li>
            <li>আমাদের ওয়েবসাইট ও সার্ভার নিরাপদ রাখতে, স্প্যাম ও অপব্যবহার ঠেকাতে।</li>
            <li>আইনি বাধ্যবাধকতা মেনে চলতে।</li>
          </ul>
        ),
      },
      {
        id: 'share',
        title: 'যাদের সাথে শেয়ার করি',
        content: (
          <>
            <p>আমরা আপনার তথ্য বিক্রি করি না। শুধু সার্ভিস দিতে বা আইন চাইলে শেয়ার করি:</p>
            <ul>
              <li>Cloudflare Turnstile যাচাই করে যে যোগাযোগ ফর্মটি কোনো মানুষ ব্যবহার করছে, বট নয়।</li>
              <li>ডোমেইন রেজিস্ট্রি ও রেজিস্ট্রার ডোমেইন রেজিস্টারের জন্য দরকারি মালিকের তথ্য পায়।</li>
              <li>পেমেন্ট প্রোভাইডার আপনার পেমেন্ট প্রক্রিয়া করে; আমরা পুরো কার্ড নম্বর সংরক্ষণ করি না।</li>
              <li>Meta মেসেঞ্জারের মেসেজ পৌঁছে দেয়, আর উত্তর লেখার জন্য একটি AI সার্ভিস প্রোভাইডার সেগুলো প্রক্রিয়া করে।</li>
              <li>আইন, নিয়ন্ত্রক সংস্থা বা আদালত চাইলে কর্তৃপক্ষ।</li>
            </ul>
          </>
        ),
      },
      { id: 'cookies', title: 'কুকি', content: <p>এই ওয়েবসাইট বিজ্ঞাপন বা ট্র্যাকিং কুকি ব্যবহার করে না। ক্লায়েন্ট এরিয়া ও যোগাযোগ ফর্মের নিরাপত্তা যাচাই চলার জন্য প্রয়োজনীয় কুকি ব্যবহার করে। ভাষা বদলানোর বাটন আপনার পছন্দের ভাষা মনে রাখতে একটি কুকি রাখে। মেসেঞ্জার বাটনে ক্লিক করলেই শুধু ফেসবুক মেসেঞ্জার খোলে।</p> },
      { id: 'keep', title: 'কত দিন রাখি', content: <p>উত্তর দেওয়া ও ফলো-আপের জন্য যত দিন দরকার, তত দিন যোগাযোগের মেসেজ রাখি। গ্রাহক ও বিলিংয়ের রেকর্ড আপনি গ্রাহক থাকা পর্যন্ত, এবং পরে আইন যত দিন চায় তত দিন রাখা হয়।</p> },
      { id: 'rights', title: 'আপনার অধিকার', content: <p>আইনের কারণে রাখতে বাধ্য না হলে, আমাদের কাছে থাকা আপনার ব্যক্তিগত তথ্য দেখতে, সংশোধন করতে বা মুছে ফেলতে বলতে পারেন। আমাদের জানালে যত দ্রুত সম্ভব উত্তর দেব।</p> },
      { id: 'changes', title: 'এই নীতির পরিবর্তন', content: <p>এই নীতি বদলালে আমরা এই পেজ এবং ওপরের তারিখ হালনাগাদ করব।</p> },
    ]
  }
  return [
    { id: 'who', title: 'Who we are', content: <p>RaishaHost is a web hosting and digital services company based in Bangladesh. This policy covers this website (raishahost.com) and the client area at hosting.raishahost.com. Questions about privacy: {contact}.</p> },
    {
      id: 'collect',
      title: 'What we collect',
      content: (
        <>
          <p>We only collect what we need to answer you and provide our services:</p>
          <ul>
            <li><b>Contact form:</b> your name, email address, subject and message. To stop spam we also record the IP address, browser details and an approximate location worked out from the IP address.</li>
            <li><b>Customers:</b> when you order, our billing system in the {client('Client Area')} keeps your name, contact and billing details, your services and your support tickets. Domain registrations need the owner details that registries require.</li>
            <li><b>Server logs:</b> like every website, our servers keep standard logs (IP address, pages visited, time) for security and to fix problems.</li>
            <li><b>Facebook Messenger:</b> when you message our Facebook Page, we receive your Facebook name and ID and the messages, photos and voice notes you send.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'messenger',
      title: 'Messenger and our AI assistant',
      content: (
        <>
          <p>Messages to our Facebook Page are first answered by an AI assistant, and our team can read and reply to the same conversation.</p>
          <ul>
            <li>Your messages are sent to an AI service provider to write the reply. Voice notes are turned into text and photos are described in words for the same reason.</li>
            <li>We keep the recent conversation so the assistant remembers what you asked, and so our team can follow up.</li>
            <li>We use this information only to answer you and provide our services. We do not use it for advertising and do not sell it.</li>
            <li>The assistant never asks for passwords, one-time codes or card numbers. Please do not send them.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'delete',
      title: 'Deleting your data',
      content: (
        <>
          <p>To delete your Messenger conversation or any other personal information we hold:</p>
          <ul>
            <li>Send &ldquo;Delete my data&rdquo; to our Facebook Page in Messenger, or email info@raishahost.com from the address you used with us.</li>
            <li>We delete it within 30 days and confirm when it is done. Records we must keep by law (for example invoices) are kept only for as long as the law requires.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'use',
      title: 'How we use it',
      content: (
        <ul>
          <li>To reply to your questions and give support.</li>
          <li>To set up, bill and run the services you order.</li>
          <li>To keep our website and servers secure and stop spam and abuse.</li>
          <li>To meet legal obligations.</li>
        </ul>
      ),
    },
    {
      id: 'share',
      title: 'Who we share it with',
      content: (
        <>
          <p>We do not sell your information. We share it only when needed to provide a service or when the law requires it:</p>
          <ul>
            <li>Cloudflare Turnstile checks that the contact form is used by a person, not a bot.</li>
            <li>Domain registries and registrars receive the owner details needed to register a domain.</li>
            <li>Payment providers process your payments; we do not store full card numbers.</li>
            <li>Meta delivers Messenger messages, and an AI service provider processes them to write replies.</li>
            <li>Authorities, when a law, regulator or court requires it.</li>
          </ul>
        </>
      ),
    },
    { id: 'cookies', title: 'Cookies', content: <p>This website does not use advertising or tracking cookies. The client area and the contact form&apos;s security check use cookies that are needed for them to work. The language switch stores one cookie to remember your language. The Messenger button only opens Facebook Messenger when you click it.</p> },
    { id: 'keep', title: 'How long we keep it', content: <p>We keep contact messages as long as needed to answer and follow up. Customer and billing records are kept while you are a customer and afterwards as long as the law requires.</p> },
    { id: 'rights', title: 'Your choices', content: <p>You can ask to see, correct or delete the personal information we hold about you, unless we must keep it by law. Contact us and we will reply as soon as we can.</p> },
    { id: 'changes', title: 'Changes to this policy', content: <p>If we change this policy we will update this page and the date at the top.</p> },
  ]
}

export const privacyMetadata = (lang: Lang) => pageMeta('/privacy', lang, meta[lang])

export default function PrivacyView({ lang }: { lang: Lang }) {
  const h = head[lang]
  return (
    <InnerPage lang={lang} kicker={h.kicker} title={h.h1} lede={h.lede}>
      <PolicyDoc lang={lang} updated={h.updated} sections={sections(lang)} />
    </InnerPage>
  )
}
