"use client";

/**
 * Animaciones de entrada suaves y profesionales basadas en scroll.
 *
 * - <Reveal>  : revela un bloque (fade + desplazamiento sutil) al entrar en viewport.
 * - <Stagger> + <StaggerItem> : revela una grilla/lista con efecto escalonado.
 *
 * Respeta `prefers-reduced-motion`: cuando el usuario lo pide, se elimina el
 * desplazamiento y solo queda una aparición inmediata (sin movimiento).
 */

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET = 24;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function offsetFor(direction: Direction, reduce: boolean): { x: number; y: number } {
  if (reduce) return { x: 0, y: 0 };
  switch (direction) {
    case "up":
      return { x: 0, y: OFFSET };
    case "down":
      return { x: 0, y: -OFFSET };
    case "left":
      return { x: OFFSET, y: 0 };
    case "right":
      return { x: -OFFSET, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Retardo en segundos antes de animar. */
  delay?: number;
  direction?: Direction;
}

export function Reveal({ children, className, delay = 0, direction = "up" }: RevealProps) {
  const reduce = useReducedMotion() ?? false;
  const { x, y } = offsetFor(direction, reduce);
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
}

export function Stagger({ children, className }: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: StaggerProps) {
  const reduce = useReducedMotion() ?? false;
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
