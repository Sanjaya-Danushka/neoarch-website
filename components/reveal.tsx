"use client"

import { useEffect, useRef, useState } from "react"

type RevealFrom = "up" | "left" | "right"

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  from?: RevealFrom
}

const fromStyles: Record<RevealFrom, { hidden: string; visible: string }> = {
  up:    { hidden: "translateY(40px)",  visible: "translateY(0)" },
  left:  { hidden: "translateX(-60px)", visible: "translateX(0)" },
  right: { hidden: "translateX(60px)",  visible: "translateX(0)" },
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 700,
  from = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const s = fromStyles[from]

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let timer: ReturnType<typeof setTimeout> | null = null
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setVisible(true), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      if (timer) clearTimeout(timer)
    }
  }, [delay])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        opacity: visible ? 1 : 0,
        transform: visible ? s.visible : s.hidden,
      }}
    >
      {children}
    </div>
  )
}
