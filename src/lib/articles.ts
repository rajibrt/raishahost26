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
    title: 'Does your business depend only on Facebook?',
    excerpt: 'The risks of running a business only through a Facebook page, and why your own website protects you.',
    category: 'Business',
    date: 'Dec 10, 2023',
    readTime: '4 min',
    lang: 'English',
    color: '#f59e0b',
    gradient: 'from-amber-500/20 to-transparent',
    content: [
      {
        type: 'p',
        text: 'If the answer is yes, your online business is at risk. Many followers can feel reassuring, but have you thought about what happens if Facebook suspends or closes your page, for a while or for good? Do you have anywhere else to sell?',
      },
      {
        type: 'p',
        text: 'Facebook is not your own website. It is a third party, a bit like renting a shop. On the internet you want a shop and an address that belong to you. Customers also see a proper website as a real online store, and they trust it more.',
      },
      {
        type: 'p',
        text: 'We are not telling you to stop using Facebook. Use its shopping features to reach more people. Those features work best when your page is connected to your own website.',
      },
      {
        type: 'h2',
        text: 'What an online store website gives you',
      },
      {
        type: 'ol',
        items: [
          'Trust. Anyone can open a Facebook page and upload a few products, and some do it to cheat buyers. When customers see your own store website, you look professional and reliable, and that helps you sell more.',
          'A backup. If you lose your Facebook page, customers can still find, browse and buy your products on your website.',
          'Less work. Products you add to your website can be sent to your Facebook shop automatically, which saves you a lot of time.',
          'More Facebook features. Connecting a website unlocks extra shopping tools, such as product carousels with links, and customers can message you on Messenger straight from your site.',
          'New customers from Google. People searching on Google can find your products, which brings buyers who would never see your page.',
          'More ways to pay. Besides cash on delivery, customers can pay with mobile wallets, cards or bank transfer through your website.',
        ],
      },
      {
        type: 'p',
        text: 'Put simply: if you sell online without your own website, you are behind your competitors. If this article made you think your business needs a store website, talk to us and we will go through the details with you.',
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
    title: 'What to check before you buy a domain and hosting',
    excerpt: 'What to keep in mind when you buy a domain name and web hosting, and the mistakes to avoid.',
    category: 'Hosting Tips',
    date: 'Oct 22, 2023',
    readTime: '5 min',
    lang: 'English',
    color: '#05CCF7',
    gradient: 'from-cyan-500/20 to-transparent',
    content: [
      {
        type: 'p',
        text: 'Every website, for a business or for yourself, needs a domain name and web hosting. Thousands of companies around the world sell both, for a monthly or yearly fee.',
      },
      {
        type: 'p',
        text: 'They are not all equally good. Some have good hosting but poor support; others have good support but slow servers. So before you buy from anyone, check a few things.',
      },
      {
        type: 'h2',
        text: 'Before you buy a domain',
      },
      {
        type: 'ol',
        items: [
          'Plan first. Decide what kind of website you want, then think carefully about the name.',
          'For most business or personal sites, .com is the best choice. A .net can suit a network business and .org a non-profit.',
          'Keep it short. Short names are easier for visitors to remember, and a good name is an asset.',
          'Make it unique, so it is not confused with a big brand.',
        ],
      },
      {
        type: 'h2',
        text: 'Where to register your domain',
      },
      {
        type: 'ol',
        items: [
          'Choose a provider you can pay easily, in your own currency, and who gives you good support.',
          'Local or international, it makes no difference to the domain itself: registrations go through the same registries.',
          'Ask one question before you buy: will you get full control of the domain in your own control panel? If not, buy somewhere else.',
          'It is easiest to register the domain with the same company that hosts your website.',
          'Read the details of any very cheap offer before you accept it.',
          'If a price is far below the usual market price for that ending (.com, .net and so on), check the renewal price and conditions.',
        ],
      },
      {
        type: 'h2',
        text: 'Before you buy hosting',
      },
      {
        type: 'p',
        text: 'After the domain you need hosting: without it, a domain alone cannot show a website. Hosting plans differ a lot in type and quality, so check these points first.',
      },
      {
        type: 'ol',
        items: [
          'Budget: base it on the type of website and how many visitors you expect each day.',
          'Storage: pick a plan with enough space for your site, emails and files.',
          'Bandwidth: choose it by your number of visitors.',
          'Uptime: look for a 99.9% uptime target, and check the company’s record before you buy.',
          'Money-back guarantee: companies that offer 30 days usually stand behind their service.',
          'The company: talk to their support, read user reviews and ask how they handle problems.',
          'Support: make sure help is fast. Slow support means lost visitors.',
          'Type of hosting: Linux or Windows, depending on what your site needs.',
          'Features: check for cPanel, free SSL, backups and anything else you need.',
          'Limits: even on “unlimited” plans, read the fair usage policy.',
          'Server load: on shared hosting, an overloaded server makes every site slow, so ask how they prevent it.',
        ],
      },
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
