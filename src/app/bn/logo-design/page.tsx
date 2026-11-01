import LogoDesignView, { logoDesignMetadata } from '@/views/LogoDesignView'

export const metadata = logoDesignMetadata('bn')

export default function LogoDesignBnPage() {
  return <LogoDesignView lang='bn' />
}
