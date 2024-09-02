'use client'

import { motion, MotionStyle } from 'framer-motion'

interface PageTransitionProperties {
  children: React.ReactNode
  delay?: number
  style?: MotionStyle
}

const PageTransition: React.FC<PageTransitionProperties> = ({ children, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, delay }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
