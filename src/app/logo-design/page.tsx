import LogoDesignView, { logoDesignMetadata } from '@/views/LogoDesignView'

export const metadata = logoDesignMetadata('en')

export default function LogoDesignPage() {
  return <LogoDesignView lang='en' />
}
