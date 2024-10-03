import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    children: React.ReactNode,
    className?: string
}

const SectionWrapper = ({children,className}: Props) => {
  return (
    <div className="flex justify-center mx-auto"  >
      <div className={cn(`max-w-[1280px]  mx-20   ${className}`)}>
        {children}
      </div>
    </div>
  );
}

export default SectionWrapper