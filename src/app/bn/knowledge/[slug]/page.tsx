import { ArticleView, articleMetadata, articleSlugs } from '@/views/KnowledgeView'

export function generateStaticParams() {
  return articleSlugs()
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return articleMetadata((await params).slug, 'bn')
}

export default async function ArticleBnPage({ params }: { params: Promise<{ slug: string }> }) {
  return <ArticleView slug={(await params).slug} lang='bn' />
}
