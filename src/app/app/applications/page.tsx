'use client'

import Button from "@/components/Button"
import { Header } from "@/components/Header"
import { useApiService } from "@/services/api"
import { Application } from "@/services/api/interfaces"
import { useToast } from "@/services/toast"
import { Check, ChevronRight, Copy, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { twJoin, twMerge } from "tailwind-merge"

const Applications: React.FC = () => {
  const apiService = useApiService()
  const toast = useToast()

  const [applications, setApplications] = useState<Application[]>([])
  const [copyId, setCopyId] = useState<null | string>(null)
  const [open, setOpen] = useState<null | string>(null)

  useEffect(() => {
    apiService
      .applications()
      .then(setApplications)
      .catch((error) => toast({ title: error.response.data.feedback, type: 'danger' }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (copyId !== null) {
      void navigator.clipboard.writeText(copyId)
      setTimeout(() => {
        setCopyId(null)
      }, 1000)
    }
  }, [copyId])

  return (
    <>
      <div className="flex justify-between items-center -mt-[calc(40px)] mb-4">
        <div className="w-[40px]" />
        <Header.H2 className="mt-0">Aplicativos</Header.H2>
        <Button iconWidth hoverBgVariant="success" bgVariant="success">
          <Plus />
        </Button>
      </div>
      <ul className="flex flex-col gap-2">
        {applications.map((app) => (
          <li
            key={app.id}
            className="bg-gray-800 rounded-lg border-[1px] border-gray-800 hover:border-gray-500"
          >
            <div
              className="cursor-pointer px-4 py-2 font-bold flex items-center gap-4"
              onClick={() => {
                setOpen(open !== app.id ? app.id : null)
              }}
            >
              <div>
                <ChevronRight className={twMerge("transition-transform", open === app.id ? "rotate-90" : "")} />
              </div>
              <div className="truncate">
                {app.name}
              </div>
            </div>
            <div className={twJoin(
              "transition-all duration-300 delay-0 overflow-hidden bg-gray-800",
              "flex flex-col gap-3 rounded-lg",
              open === app.id ? 'max-h-[300px]' : 'max-h-[0px]'
            )}>
              <div className="text-xs text-center flex justify-center items-center gap-2 px-4">
                <div>
                  {app.id}
                </div>
                <div>
                  {copyId === app.id ? <Check size={14} className="inline" /> : (
                    <Copy
                      size={14}
                      className="inline cursor-pointer"
                      onClick={() => setCopyId(app.id)}
                    />
                  )}
                </div>
              </div>
              {app.keys.length > 0 ? (
                <ul className="list-disc max-h-[200px] overflow-y-auto p-2 bg-gray-700">
                  <p className="text-center">keys</p>
                  {app.keys.map((key) => <li className="ml-8" key={key}>{key}</li>)}
                </ul>
              ) : <div />}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Applications
