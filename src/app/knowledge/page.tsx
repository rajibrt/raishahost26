import KnowledgeView, { knowledgeMetadata } from '@/views/KnowledgeView'

export const metadata = knowledgeMetadata('en')

export default function KnowledgePage() {
  return <KnowledgeView lang='en' />
}
