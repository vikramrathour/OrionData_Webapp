import { lazy, Suspense } from 'react'
import { useGraphData } from './hooks/useGraphData'
import { useScrollSection } from './hooks/useScrollSection'
import { AppProvider } from './context/AppContext'
import BackgroundLayer from './components/BackgroundLayer'
import Navigation from './components/Navigation'
import Hero from './components/Hero/Hero'
import InversionSection from './components/Inversion/InversionSection'
import ArchitectureSection from './components/Architecture/ArchitectureSection'

const ProofSection = lazy(() => import('./components/Proof/ProofSection'))
const AccelerationSection = lazy(() => import('./components/Acceleration/AccelerationSection'))
const MaturityFrameworkSection = lazy(() => import('./components/MaturityFramework/MaturityFrameworkSection'))
const ROISection = lazy(() => import('./components/Section5_ROI/ROISection'))
const PlannerSection = lazy(() => import('./components/Planner/PlannerSection'))

function SectionLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal border-t-transparent" />
    </div>
  )
}

export default function App() {
  const graphData = useGraphData()
  const { activeSection, registerSection } = useScrollSection()

  return (
    <AppProvider>
      <BackgroundLayer />
      <Navigation activeSection={activeSection} />
      <main>
        {/* Snap sections (1-3): mandatory */}
        <section ref={registerSection(0)} className="snap-section" id="hero-wrapper">
          <Hero />
        </section>
        <section ref={registerSection(1)} className="snap-section" id="inversion-wrapper">
          <InversionSection />
        </section>
        <section ref={registerSection(2)} className="snap-section" id="architecture-wrapper">
          <ArchitectureSection graphData={graphData} />
        </section>

        {/* Free-scroll sections (4-7) */}
        <div ref={registerSection(3)}>
          <Suspense fallback={<SectionLoader />}>
            <ProofSection graphData={graphData} />
          </Suspense>
        </div>
        <div ref={registerSection(4)}>
          <Suspense fallback={<SectionLoader />}>
            <AccelerationSection />
          </Suspense>
        </div>
        <div ref={registerSection(5)}>
          <Suspense fallback={<SectionLoader />}>
            <MaturityFrameworkSection />
          </Suspense>
        </div>
        <div ref={registerSection(6)}>
          <Suspense fallback={<SectionLoader />}>
            <ROISection />
          </Suspense>
        </div>
        <div ref={registerSection(7)}>
          <Suspense fallback={<SectionLoader />}>
            <PlannerSection graphData={graphData} />
          </Suspense>
        </div>
      </main>
    </AppProvider>
  )
}
