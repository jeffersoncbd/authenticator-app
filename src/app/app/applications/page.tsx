'use client'

import { Header } from "@/components/Header"
import { useApiService } from "@/services/api"
import { Application } from "@/services/api/interfaces"
import { useToast } from "@/services/toast"
import { useEffect, useState } from "react"
import { twJoin } from "tailwind-merge"

const Applications: React.FC = () => {
  const apiService = useApiService()
  const toast = useToast()

  const [applications, setApplications] = useState<Application[]>([])
  const [open, setOpen] = useState<null | string>(null)

  useEffect(() => {
    apiService
      .applications()
      .then(setApplications)
      .catch((error) => toast({ title: error.response.data.feedback, type: 'danger' }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header.H2 className="mb-4">Aplicativos</Header.H2>
      <ul>
        {applications.map((app) => (
          <li
            key={app.id}
            className="bg-gray-800 px-4 py-2 rounded-md cursor-pointer"
            onClick={() => {
              setOpen(open === null ? app.id : null)
            }}
          >
            <b>{app.name}</b>
            <div className={twJoin(
              "transition-all duration-1000 overflow-hidden",
              open === app.id ? 'max-h-[200px]' : 'max-h-0'
            )}>
              {open === app.id && (
                <>
                  <p className="text-sm text-center">{app.id}</p>
                  <ul className="list-disc ml-4">
                    {app.keys.map((key) => <li key={key}>{key}</li>)}
                  </ul>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Applications
