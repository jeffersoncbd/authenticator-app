import React, { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type HeaderName = 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6'
type HeaderProperties = React.FC<HTMLAttributes<HTMLHeadElement>>

export const Header: Record<HeaderName, HeaderProperties> = {
  H1: ({ className, ...properties }) => <h1 {...properties} className={twMerge("mt-4 text-3xl font-bold text-center", className)} />,
  H2: ({ className, ...properties }) => <h2 {...properties} className={twMerge("mt-4 text-2xl font-bold text-center", className)} />,
  H3: ({ className, ...properties }) => <h3 {...properties} className={twMerge("mt-4 text-xl font-bold", className)} />,
  H4: ({ className, ...properties }) => <h4 {...properties} className={twMerge("mt-4 text-xl", className)} />,
  H5: ({ className, ...properties }) => <h5 {...properties} className={twMerge("mt-4 text-lg", className)} />,
  H6: ({ className, ...properties }) => <h6 {...properties} className={twMerge("mt-4 text-md", className)} />,
}
