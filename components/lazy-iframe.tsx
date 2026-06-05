"use client"

import { useEffect, useRef, useState } from "react"

export function LazyIframe({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true)
          observer.unobserve(el)
        }
      },
      { rootMargin: "200px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative h-full w-full" style={{ aspectRatio: "16/9" }}>
      {load ? (
        <iframe
          src={src}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={title}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-muted/30">
          <div className="h-8 w-8 animate-pulse rounded-full bg-primary/20" />
        </div>
      )}
    </div>
  )
}
