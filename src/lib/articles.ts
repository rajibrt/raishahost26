export type Article = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  lang: string
  color: string
  gradient: string
  content: ContentBlock[]
}

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }

export const articles: Article[] = [
  {
    slug: 'facebook-dependent-business',
    title: 'আপনার ব্যবসা কি শুধুমাত্র ফেসবুক নির্ভর?',
    excerpt: 'শুধুমাত্র ফেসবুকের উপর নির্ভর করে ব্যবসা পরিচালনা করলে কী ধরনের ঝুঁকি তৈরি হতে পারে এবং কীভাবে নিজের ওয়েবসাইট থাকা দরকার।',
    category: 'Business',
    date: 'Dec 10, 2023',
    readTime: '5 min',
    lang: 'বাংলা',
    color: '#f59e0b',
    gradient: 'from-amber-500/20 to-transparent',
    content: [
      {
        type: 'p',
        text: 'উত্তরটা যদি হয় হ্যাঁ তাহলে আপনার অনলাইন ব্যবসা ঝুঁকির মধ্যে রয়েছে। অনেক ফলোয়ার থাকার কারণে হয়তো আপনি স্বস্তি-বোধ করছেন কিন্তু একটা ব্যাপার কি ভেবে দেখেছেন যে, কোনো কারণে যদি আপনার পেইজটি ফেসবুক সাময়িক বা স্থায়ীভাবে ব্যান বা বন্ধ করে দেয় সেক্ষেত্রে আপনার কি কোনো বিকল্প রয়েছে?',
      },
      {
        type: 'p',
        text: 'তাছাড়াও ফেসবুক আপনার নিজের ওয়েবসাইট না, শুধুই ৩য় একটি পক্ষ-মাত্র, ব্যাপারটা অনেকটা ভাড়া করা দোকানের মতো। আর ইন্টারনেটের এই মহাজগতে আপনার একেবারে নিজের একটি দোকান বা ঠিকানা থাকবে সেটা নিশ্চয়ই আপনি চাইবেন। আর ক্রেতারা উপযুক্ত অনলাইন শপ বা দোকান বলতে ই-কমার্স ওয়েবসাইটকেই বুঝে থাকে এবং ক্রেতার বিশ্বাসের জায়গাতেও ই-কমার্স ওয়েবসাইট অনেকখানি এগিয়ে।',
      },
      {
        type: 'p',
        text: 'আপনাকে আমরা ফেসবুক ব্যবহার করতে একেবারেই নিরুৎসাহিত করছি না, বরং ফেসবুকের নতুন ই-কমার্স ফিচারগুলো ব্যাবহারের মাধ্যমে আপনার পণ্য মানুষের কাছে বেশি করে পৌঁছে দিন এটাই আমাদের চাওয়া। আপনি নিশ্চয়ই জানেন ফেসবুকের ই-কমার্স ফিচারগুলো সবচেয়ে ভালোভাবে কাজে লাগানো যায় পেইজের সাথে যদি ওয়েবসাইটকে যুক্ত করা হয়।',
      },
      {
        type: 'h2',
        text: 'চলুন দেখে নিই ই-কমার্স ওয়েবসাইটের কিছু সুবিধা:',
      },
      {
        type: 'ol',
        items: [
          'ক্রেতার কাছে আপনার ব্র্যান্ডের গ্রহণযোগ্যতা বহুগুণ বাড়িয়ে দেয় যা আপনার বিক্রি বাড়াতে সাহায্য করে। কারণ আজকাল একটি ফেসবুক পেইজ খুলে সেখানে কিছু পণ্য আপলোড করে অনেকেই ক্রেতাদের বিশ্বাস নষ্ট করছে। সেক্ষেত্রে ক্রেতা যখন আপনার ই-কমার্স ওয়েবসাইটটি দেখবে তখন আপনাকে পেশাদার, স্মার্ট এবং বিশ্বস্ত ব্যবসায়ী মনে করবে।',
          'কোনো কারণে আপনার ফেসবুক পেইজটি হারিয়ে গেলেও ক্রেতারা ওয়েবসাইটের মাধ্যমে আপনার পণ্য দেখতে বা ক্রয় করতে পারবে।',
          'ওয়েবসাইটে পণ্যের বিস্তারিত আপলোড করার সাথে সাথে তা আপনার ফেসবুক পেইজেও স্বয়ংক্রিয়ভাবে আপলোড হয়ে যাবে যা কিনা আপনার অফুরন্ত সময় বাঁচাবে।',
          'আপনার পেইজের সাথে ওয়েবসাইটকে যুক্ত করলে ফেসবুক আপনাকে নতুন কিছু ই-কমার্স ফিচার ব্যাবহার করার সুযোগ দিবে — পণ্যের লিঙ্ক সহ স্লাইডার ছবি আপলোড করতে পারবেন, ক্রেতারা ওয়েবসাইট থেকে সরাসরি মেসেঞ্জারের মাধ্যমে আপনার সাথে কথা বলতে পারবে।',
          'গুগল সার্চের মাধ্যমে ক্রেতারা আপনাকে সহজেই খুঁজে পাবে এবং এক্ষেত্রে গুগলের মাধ্যমে নতুন ক্রেতা পাবার সম্ভাবনা বহুগুণে বেড়ে যাবে।',
          'ক্যাশ অন ডেলিভারি ছাড়াও বিকাশ, নগদ, রকেট এবং ব্যাংকের মাধ্যমে ক্রেতা পেমেন্ট করার সুবিধা পাবে আপনার ওয়েবসাইটের মাধ্যমে।',
        ],
      },
      {
        type: 'p',
        text: 'সহজ ভাষায় বলতে গেলে আপনি ই-কমার্স ব্যবসা করছেন কিন্তু আপনার ওয়েবসাইট নেই, তার মানে আপনি প্রতিযোগিতায় পিছিয়ে আছেন অন্যদের চেয়ে। এই লেখাটি পড়ার পর আপনার যদি কিছুক্ষণের জন্যেও মনে হয় যে হ্যাঁ ব্যবসার ভালোর জন্য একটা ই-কমার্স ওয়েবসাইট করা দরকার তাহলে আমাদের সাথে কথা বলে বাকি বিষয়গুলো বিস্তারিত আলাপ করে নেবার আমন্ত্রণ রইলো।',
      },
    ],
  },
  {
    slug: 'woocommerce-product-pages',
    title: '4 Ways to Create Better WooCommerce Product Pages',
    excerpt: 'Learn how to optimize your WooCommerce product pages to boost conversions and improve the shopping experience for your customers.',
    category: 'E-commerce',
    date: 'Nov 15, 2023',
    readTime: '7 min',
    lang: 'English',
    color: '#6366f1',
    gradient: 'from-indigo-500/20 to-transparent',
    content: [
      {
        type: 'p',
        text: 'There are many moving parts involved when it comes to creating and maintaining a WooCommerce site. Product pages are a key element that is easy to overlook, but vital to the success of your online business.',
      },
      {
        type: 'p',
        text: 'Fortunately, there are a few techniques you can implement to significantly improve your product pages. Since they\'re a primary driving force behind most customers\' purchasing decisions, it\'s wise to do all you can to enhance their effectiveness.',
      },
      {
        type: 'h2',
        text: 'The Importance of Product Pages for Your E-Commerce Store',
      },
      {
        type: 'p',
        text: 'Whether you\'re new to e-commerce, or have been selling products online for a while and want to increase sales, you\'ve probably come across plenty of advice for optimizing your WooCommerce site. However, most of it is likely general guidance for improving performance or driving traffic your way.',
      },
      {
        type: 'p',
        text: 'While those tips can be highly effective, loading pages quickly and getting visitors to your site won\'t necessarily bring the conversion rate you want if your product pages are still lacking. At the end of the day, that is where sales actually take place.',
      },
      {
        type: 'p',
        text: 'Around 85 percent of customers conduct research online before deciding which brand to purchase a product from. This means that it\'s highly important to publish detailed and clear information about your merchandise on your website, so shoppers can learn everything they want to know about each item.',
      },
      {
        type: 'h2',
        text: '4 Ways to Create Better WooCommerce Product Pages',
      },
      {
        type: 'h3',
        text: '1. Incorporate High-Quality Images',
      },
      {
        type: 'p',
        text: 'One of the most challenging aspects of buying products online is that it\'s more difficult to get a sense of what the items are like in person. You can help minimize your customers\' indecision by providing high-quality images of your merchandise.',
      },
      {
        type: 'p',
        text: 'The best product images include the following elements:',
      },
      {
        type: 'ul',
        items: [
          'Proper lighting, so products appear clear and easy to see',
          'Plain backgrounds that aren\'t distracting',
          'Multiple angles, so customers can recreate the experience of picking up an item and looking at it',
          'Closeups and/or a zoom feature that enables shoppers to see details such as stitching',
        ],
      },
      {
        type: 'p',
        text: 'While you can certainly achieve all of these goals on your own, you might also consider hiring a professional product photographer to achieve top quality.',
      },
      {
        type: 'h3',
        text: '2. Optimize Product Descriptions With Keywords',
      },
      {
        type: 'p',
        text: 'Search Engine Optimization (SEO) is not only important for driving organic traffic to your site, but also for helping customers find what they\'re looking for. Using keywords in your product descriptions can speed up their searches and filter out irrelevant results.',
      },
      {
        type: 'p',
        text: 'When writing descriptions for your product pages, make sure to use common terms that users might be searching for when looking for specific types of items. Highlight key features, and use clear and direct language so shoppers can understand the benefits of buying your products.',
      },
      {
        type: 'p',
        text: 'With that being said, you don\'t want your product descriptions to become lists of search terms. Keep in mind that their primary purpose is to provide value to customers, and help them make purchasing decisions. That means it\'s important to work your keywords in naturally.',
      },
      {
        type: 'h3',
        text: '3. Include Conversion-Boosting Elements',
      },
      {
        type: 'p',
        text: 'Product pages are often the first step in the checkout process. Minimizing friction throughout the buyer\'s journey can help improve your sales rate and decrease shopping cart abandonment.',
      },
      {
        type: 'p',
        text: 'Incorporating one-click purchase buttons, variation and quantity selectors, and other elements that streamline your product pages\' UX can go a long way towards boosting your profits.',
      },
      {
        type: 'p',
        text: 'A simple way to add these features is by choosing a quality WooCommerce theme that includes them out of the box. If you already have a theme that you like, however, there are plenty of other ways to enhance your product pages.',
      },
      {
        type: 'h3',
        text: '4. Use a WordPress Page Builder',
      },
      {
        type: 'p',
        text: 'Last but not least, page builders are very useful for enhancing your product pages. For starters, many of them include WooCommerce-specific elements that you can easily drag-and-drop into your content, including user ratings, upsells, and more.',
      },
      {
        type: 'p',
        text: 'Beyond adding advanced elements, page builders also enable you to see your content from a customer\'s perspective while you\'re creating it. This can help you catch potential problems that might derail buyers and steer them away from your site.',
      },
      {
        type: 'p',
        text: 'With a page builder, you can also use templates to speed up the design process and maintain consistency between product listings. There are many excellent WordPress page builders you can use to customize WooCommerce product pages, and most are extremely easy to get started with.',
      },
      {
        type: 'h2',
        text: 'Conclusion',
      },
      {
        type: 'p',
        text: 'There are many site optimization best practices that can help you improve your online store\'s performance and overall UX. However, it\'s also important not to overlook your product pages, as they play a key role in encouraging customers to complete purchases.',
      },
      {
        type: 'p',
        text: 'In this post, we\'ve covered a few key ways you can improve your WooCommerce product pages to make them more enticing to customers:',
      },
      {
        type: 'ol',
        items: [
          'Incorporate high-quality photos.',
          'Optimize product descriptions with keywords.',
          'Include conversion-boosting elements such as buttons and timers.',
          'Use a WordPress page builder.',
        ],
      },
    ],
  },
  {
    slug: 'domain-hosting-tips',
    title: 'ডোমেইন এবং হোস্টিং কেনার আগে অবশ্যই মনে রাখবেন',
    excerpt: 'ডোমেইন এবং হোস্টিং কেনার সময় কোন বিষয়গুলো মাথায় রাখবেন এবং কোন ভুলগুলো এড়িয়ে চলবেন — বিস্তারিত গাইড।',
    category: 'Hosting Tips',
    date: 'Oct 22, 2023',
    readTime: '6 min',
    lang: 'বাংলা',
    color: '#05CCF7',
    gradient: 'from-cyan-500/20 to-transparent',
    content: [
      {
        type: 'p',
        text: 'ব্যবসায়িক বা ব্যক্তিগত প্রয়োজনে ওয়েবসাইট তৈরী করতে হয়। আর ওয়েবসাইট তৈরী করতে হলে আপনাকে ডোমেইন এবং হোস্টিং কিনতে হবে। বাংলাদেশসহ পৃথিবীর সকল দেশে হাজার হাজার ডোমেইন এবং হোস্টিং প্রভাইডার কোম্পানী আছে যারা মাসিক বা বাৎসরিক টাকার বিনিময়ে আপনাকে ডোমেইন এবং হোস্টিং সার্ভিস দিয়ে থাকে।',
      },
      {
        type: 'p',
        text: 'এত্তো প্রভাইডারের মধ্যে সবাই সমান ভালো সার্ভিস প্রদান করে না। কারো হোস্টিং ভালো তো কাস্টোমার সার্ভিস খারাপ। আবার কারো কাস্টোমার সার্ভিস ভালো তো হোস্টিং খারাপ। তাই হুট করে কারো কাছ থেকে ডোমেইন এবং হোস্টিং কেনার আগে আপনাকে কিছু বিষয় খেয়াল রাখতে হবে।',
      },
      {
        type: 'h2',
        text: 'ডোমেইন কেনার আগে যা যা খেয়াল রাখতে হবে:',
      },
      {
        type: 'ol',
        items: [
          'কোন ধরনের ওয়েবসাইট করতে চাচ্ছেন সেটা আগে ভালোভাবে প্ল্যান করবেন এবং ডোমেইন নেম কি নিবেন সেটা নিয়ে ভালো করে চিন্তা করবেন।',
          'সাধারণত ব্যবসা বা ব্যক্তিগত ওয়েবসাইটের জন্য .com ডোমেইনই ভালো। তবে নেটওয়ার্কিং বিজনেস হলে .net, নন-প্রফিটেবল হলে .org নিতে পারেন।',
          'ডোমেইনটি যত ছোট করা যায় চেষ্টা করতে হবে। এতে ভিজিটররা সহজে মনে রাখতে পারবে। সুন্দর ওয়েবসাইট নেম একটি ভালো সম্পদ।',
          'ডোমেইন নেম ইউনিক নেওয়ার চেষ্টা করতে হবে যেন অন্য বড় কোনো ব্র্যান্ডের সাথে গুলিয়ে না যায়।',
        ],
      },
      {
        type: 'h2',
        text: 'ডোমেইন কোথা থেকে রেজিস্ট্রেশন করবেন:',
      },
      {
        type: 'ol',
        items: [
          'বাংলাদেশি প্রভাইডারের কাছ থেকে ডোমেইন নেওয়া ভালো — টাকায় পেমেন্ট করতে পারবেন এবং ভালো সাপোর্ট পাবেন।',
          'ডোমেইনের ক্ষেত্রে বাংলাদেশি এবং বিদেশী কোম্পানির কোনো পার্থক্য নেই। একই রেজিস্ট্রার থেকে রেজিস্ট্রেশন হয়।',
          'বাংলাদেশী প্রভাইডারের কাছে ডোমেইন নিলে একটি কথা আগে জিজ্ঞাসা করুন — ডোমেইনের ফুল কন্ট্রোল প্যানেল দেবে কিনা। না দিলে সেখান থেকে কিনবেন না।',
          'হোস্টিং যে কোম্পানী থেকে নিবেন, সেখান থেকেই ডোমেইন নেওয়া ভালো।',
          'লোভনীয় অফারে ডোমেইন কিনতে হলে আগে ভালো করে অফার সম্পর্কে জেনে নিন।',
          'সাধারণত একটি ডোমেইনের মূল্য ৮০০-১২০০ টাকা হয়ে থাকে। এই দামের নিচে অফার হলে শর্তাবলী ভালো করে জেনে নিন।',
        ],
      },
      {
        type: 'h2',
        text: 'হোস্টিং কেনার আগে যে সকল বিষয় বিবেচনা করতে হবে:',
      },
      {
        type: 'p',
        text: 'ডোমেইন ক্রয় করার পর আপনাকে অবশ্যই হোস্টিং ক্রয় করতে হবে। হোস্টিং ছাড়া আপনি শুধু ডোমেইন দিয়ে একটি ওয়েবসাইট লাইভ করতে পারবেন না। প্রায় বেশিরভাগ কোম্পানির হোস্টিং বিভিন্ন ধরনের এবং বিভিন্ন মানের — তাই কেনার আগে নিচের বিষয়গুলো অবশ্যই বিবেচনা করুন।',
      },
      {
        type: 'ol',
        items: [
          'বাজেট: ওয়েবসাইটের ধরন ও ডেইলি ভিজিটর সংখ্যার উপর ভিত্তি করে হোস্টিং বাজেট নির্ধারণ করুন।',
          'হোস্টিং স্পেস: আপনার ওয়েবসাইটের প্রয়োজনীয় স্পেস বিবেচনা করে প্যাকেজ বেছে নিন।',
          'ব্যান্ডউইথ: ভিজিটর সংখ্যা অনুযায়ী ব্যান্ডউইথ নির্বাচন করুন। প্রয়োজনে আনলিমিটেডও নিতে পারেন।',
          'হোস্টিং আপটাইম: ৯৯.৯% আপটাইম দেয় এমন কোম্পানী বেছে নিন এবং কেনার আগে আপটাইম ইতিহাস যাচাই করুন।',
          'মানি-ব্যাক গ্যারান্টি: ৩০ দিনের মানি-ব্যাক গ্যারান্টি দেওয়া কোম্পানীগুলো সাধারণত ভালো সার্ভিস দেয়।',
          'হোস্টিং কোম্পানির অবস্থা: কাস্টমার কেয়ারে কথা বলুন, ইউজার রিভিউ দেখুন এবং সার্ভারের লোকেশন জানুন।',
          'সাপোর্ট: দ্রুত ও কার্যকর সাপোর্ট টিম আছে কিনা নিশ্চিত করুন। সাপোর্ট দেরি হলে ভিজিটর হারাবেন।',
          'হোস্টিং এর ধরন: Windows বা Linux — আপনার কাজের ধরন অনুযায়ী সঠিক হোস্টিং বেছে নিন।',
          'ফিচারসমূহ: cPanel, SSL, ব্যাকআপ সহ প্রয়োজনীয় ফিচার আছে কিনা যাচাই করুন।',
          'লিমিটেশন: আনলিমিটেড প্যাকেজ নিলেও Fair Usage Policy পড়ে নিন।',
          'সার্ভার লোড: শেয়ার্ড হোস্টিংয়ে সার্ভার ওভারলোড থাকলে সাইট স্লো হয় — আগে জেনে নিন।',
        ],
      },
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
