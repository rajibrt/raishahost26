import KnowledgeView, { knowledgeMetadata } from '@/views/KnowledgeView'

export const metadata = knowledgeMetadata('bn')

export default function KnowledgeBnPage() {
  return <KnowledgeView lang='bn' />
}
