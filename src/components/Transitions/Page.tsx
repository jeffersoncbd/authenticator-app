'use client'

import { motion } from 'framer-motion'

interface PageTransitionProperties {
  children: React.ReactNode
}

const PageTransition: React.FC<PageTransitionProperties> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ flex: "1" }}
    >
      {children}

    </motion.div>
  )
}

export default PageTransition
