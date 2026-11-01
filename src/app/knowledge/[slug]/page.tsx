import { ArticleView, articleMetadata, articleSlugs } from '@/views/KnowledgeView'

export function generateStaticParams() {
  return articleSlugs()
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return articleMetadata((await params).slug, 'en')
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  return <ArticleView slug={(await params).slug} lang='en' />
}
