import { createContext, useContext, useState, type ReactNode } from 'react'

export interface MaturityResult {
  level: number
  score: number
  isTransitional: boolean
  signals: string[]
}

export interface ROIInputs {
  industry: string
  dataVolumeTB: number
  sourceSystems: number
  engineers: number
  avgCost: number
  maintenancePct: number
  pipelineTime: string
  dqCost: number
  hasMigration: boolean
  migrationObjects: number
  migrationSource: string
  regulations: string[]
  buildingForAI: boolean
}

interface AppContextValue {
  roiInputs: ROIInputs | null
  setRoiInputs: (inputs: ROIInputs) => void
  highlightComponent: string | null
  setHighlightComponent: (id: string | null) => void
  maturityResult: MaturityResult | null
  setMaturityResult: (result: MaturityResult) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [roiInputs, setRoiInputs] = useState<ROIInputs | null>(null)
  const [highlightComponent, setHighlightComponent] = useState<string | null>(null)
  const [maturityResult, setMaturityResult] = useState<MaturityResult | null>(null)

  return (
    <AppContext.Provider value={{ roiInputs, setRoiInputs, highlightComponent, setHighlightComponent, maturityResult, setMaturityResult }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}
