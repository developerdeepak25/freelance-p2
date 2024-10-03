import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    children: React.ReactNode,
    className?: string
}

const SectionWrapper = ({children,className}: Props) => {
  return (
    <div className={cn(`max-w-[1280px]  mx-20 mx-auto  ${className}`)}>{children }</div>
  )
}

export default SectionWrapper