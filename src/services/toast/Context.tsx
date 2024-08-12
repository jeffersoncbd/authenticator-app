'use client'

import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import ToastContainer from "./Container";
import { IdentifiedToast, Toast } from "./interfaces";

interface ToastContextProperites {
  addToast: (toast: Toast) => void
}

export const ToastContext = createContext<ToastContextProperites>({
  addToast: () => undefined,
})

interface ToastProviderProperties {
  children: React.ReactNode
}

const ToastProvider: React.FC<ToastProviderProperties> = ({ children }) => {
  const [toasts, setToasts] = useState<IdentifiedToast[]>([])
  const [reference, setReference] = useState(new Date().getTime())

  const closeToast = (id: string) => {
    setToasts(toasts.filter((toast) => toast.id !== id))
  }
  const addToast = (toast: Toast) => {
    setToasts((prevToasts) => [
      ...prevToasts,
      { id: uuidV4(), ...toast, timestamp: new Date().getTime() }
    ])
  }

  useEffect(() => {
    setToasts((toasts) => toasts.filter((toast) => reference - toast.timestamp <= 2000))
  }, [toasts, reference])

  useEffect(() => {
    const timer = setTimeout(() => setReference(new Date().getTime()), 2000)
    return () => clearTimeout(timer)
  }, [reference])

  return (
    <ToastContext.Provider value={{ addToast }}>
      <ToastContainer toasts={toasts} closeToast={closeToast} />
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
