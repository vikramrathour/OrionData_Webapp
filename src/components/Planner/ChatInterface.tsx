import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ConversationMessage } from './PlannerAPI'

const PLACEHOLDERS = [
  "We're a mid-size bank struggling with BCBS 239 compliance...",
  'Our clinical data sits in 12 systems with no common patient identifier...',
  'We need to migrate 5,000 tables from Oracle to Snowflake...',
  'Our data quality issues cost us $2M annually in regulatory fines...',
]

const QUICK_STARTS = [
  'Regulatory compliance in banking',
  'Clinical data platform for healthcare',
  'Cloud migration at scale',
  'Data quality for AI readiness',
]

const LOADING_STAGES = [
  'Analyzing your challenge...',
  'Mapping to ORIAN.Data components...',
  'Estimating acceleration...',
  'Building your solution plan...',
]

interface Props {
  onSubmit: (message: string) => void
  loading: boolean
  conversation: ConversationMessage[]
  initialMessage?: string
}

export default function ChatInterface({ onSubmit, loading, conversation, initialMessage }: Props) {
  const [input, setInput] = useState('')
  const [placeholderIdx, setPlaceholderIdx] = useState(0)
  const [loadingStage, setLoadingStage] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Cycle placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % PLACEHOLDERS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Loading stage animation
  useEffect(() => {
    if (!loading) { setLoadingStage(0); return }
    const intervals: number[] = []
    LOADING_STAGES.forEach((_, i) => {
      intervals.push(window.setTimeout(() => setLoadingStage(i), i * 1200))
    })
    return () => intervals.forEach(clearTimeout)
  }, [loading])

  // Pre-fill from ROI calculator
  useEffect(() => {
    if (initialMessage && !input && conversation.length === 0) {
      setInput(initialMessage)
    }
  }, [initialMessage])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  const handleSubmit = () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return
    onSubmit(trimmed)
    setInput('')
  }

  return (
    <div className="flex flex-col">
      {/* Conversation history */}
      {conversation.length > 0 && (
        <div className="mb-4 space-y-3 overflow-y-auto" style={{ maxHeight: '40vh' }}>
          {conversation.map((msg, i) => (
            <div
              key={i}
              className={`rounded-lg p-3 text-sm ${
                msg.role === 'user'
                  ? 'ml-8 bg-teal/10 text-[var(--text-primary)]'
                  : 'mr-8 bg-[var(--bg-surface)] text-[var(--text-secondary)]'
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() }
          }}
          placeholder={PLACEHOLDERS[placeholderIdx]}
          rows={3}
          disabled={loading}
          className="w-full resize-none bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
        />

        {/* Quick starts (only shown initially) */}
        {conversation.length === 0 && !input && (
          <div className="mt-3 flex flex-wrap gap-2">
            {QUICK_STARTS.map((qs) => (
              <button
                key={qs}
                onClick={() => onSubmit(qs)}
                className="rounded-full border border-[var(--border-subtle)] px-3 py-1 text-xs text-[var(--text-secondary)] transition-colors hover:border-teal hover:text-teal"
              >
                {qs}
              </button>
            ))}
          </div>
        )}

        {/* Submit button */}
        <div className="mt-3 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || loading}
            className="rounded-lg bg-teal px-5 py-2 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-40"
          >
            {loading ? 'Decoding...' : 'Decode my intent →'}
          </button>
        </div>
      </div>

      {/* Loading animation */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="mt-4 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {LOADING_STAGES.map((stage, i) => (
              <motion.div
                key={stage}
                className={`flex items-center gap-2 text-xs ${
                  i <= loadingStage ? 'text-teal' : 'text-[var(--text-muted)]'
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: i <= loadingStage ? 1 : 0.3, x: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <span className={i <= loadingStage ? 'animate-pulse' : ''}>●</span>
                {stage}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
