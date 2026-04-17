"use client"

import { useEffect, useState, useRef } from "react"

interface TerminalProps {
  text: string
  typingSpeed?: number
  className?: string
  showPrompt?: boolean
  onComplete?: () => void
}

export function Terminal({ text, typingSpeed = 50, className = "", showPrompt = true, onComplete }: TerminalProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (typeof window === "undefined") return
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isSmallViewport = window.matchMedia("(max-width: 640px)").matches
    setShouldReduceMotion(prefersReducedMotion || isSmallViewport)
  }, [])

  useEffect(() => {
    setDisplayedText("")
    setIsTyping(true)

    if (shouldReduceMotion) {
      setDisplayedText(text)
      setIsTyping(false)
      onCompleteRef.current?.()
      return
    }

    let currentIndex = 0
    let timer: NodeJS.Timeout

    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1))
        currentIndex++
        timer = setTimeout(typeNextCharacter, typingSpeed)
      } else {
        setIsTyping(false)
        onCompleteRef.current?.()
      }
    }

    typeNextCharacter()

    return () => {
      clearTimeout(timer)
    }
  }, [text, typingSpeed, shouldReduceMotion])

  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-header relative justify-center pt-2">
        <div className="absolute left-4 flex gap-2 items-center">
          <div className="terminal-button terminal-button-red"></div>
          <div className="terminal-button terminal-button-yellow"></div>
          <div className="terminal-button terminal-button-green"></div>
        </div>
        <div className="terminal-title m-0 text-center font-sans tracking-wide">terminal</div>
      </div>
      <div className="terminal-content pt-2">
        {showPrompt && <span className="text-neon font-bold">$ </span>}
        <span>{displayedText}</span>
        {isTyping && <span className="terminal-cursor"></span>}
      </div>
    </div>
  )
}

