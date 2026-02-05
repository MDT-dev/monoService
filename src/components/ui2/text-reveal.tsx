"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface TextRevealProps {
    text: string
    className?: string
    once?: boolean
    delay?: number
}

export function TextReveal({ text, className, once = true, delay = 0 }: TextRevealProps) {
    const controls = useAnimation()
    const ref = useRef(null)
    const inView = useInView(ref, { once })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        } else if (!once) {
            controls.start("hidden")
        }
    }, [controls, inView, once])

    const words = text.split(" ")

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: delay * i },
        }),
    }

    const child: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    }

    return (
        <motion.div ref={ref} className={cn("", className)} variants={container} initial="hidden" animate={controls}>
            {words.map((word, index) => (
                <motion.span key={index} className="inline-block mr-1 text-green-300" variants={child}>
                    {word}
                </motion.span>
            ))}
        </motion.div>
    )
}