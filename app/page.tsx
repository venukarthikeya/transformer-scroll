import { TransformerSequence } from "../src/components/TransformerSequence";
import { BentoGrid, BentoItem } from "../src/components/BentoGrid";

export default function Home() {
  return (
    <main className="relative min-h-[400vh]">
      <TransformerSequence />

      <div className="relative z-10 w-full flex flex-col items-center pt-[30vh] pb-[20vh] gap-[100vh]">

        {/* Section 1: Hero */}
        <section className="w-full flex justify-center">
          <BentoGrid>
            <BentoItem className="md:col-span-3 text-center py-20 flex flex-col items-center justify-center">
              <h1
                className="font-bold tracking-tighter"
                style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
              >
                Transformer
              </h1>
              <p
                className="text-white/60 mt-6 max-w-2xl"
                style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
              >
                Experience the next evolution of motion and scrolling on the web. Minimalist design meets high-performance engineering.
              </p>
            </BentoItem>
          </BentoGrid>
        </section>

        {/* Section 2: Features */}
        <section className="w-full">
          <BentoGrid>
            <BentoItem delay={0} className="md:col-span-2">
              <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }} className="font-semibold mb-4">
                Apple-Pro Aesthetic
              </h2>
              <p className="text-white/60 text-lg">
                Crafted with an uncompromising attention to detail. Features high-quality glassmorphism and bento-style layouts that look stunning on any device.
              </p>
            </BentoItem>

            <BentoItem delay={0.1} className="md:col-span-1 bg-gradient-to-br from-white/10 to-transparent">
              <h3 style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }} className="font-semibold mb-4">
                Spring Physics
              </h3>
              <p className="text-white/60">
                Driven by fluid spring animations (stiffness: 120, damping: 20) for perfectly weighted natural motion.
              </p>
            </BentoItem>
          </BentoGrid>
        </section>

        {/* Section 3: Performance */}
        <section className="w-full">
          <BentoGrid>
            <BentoItem delay={0} className="md:col-span-1">
              <h3 style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }} className="font-semibold mb-4">
                Lenis Scroll
              </h3>
              <p className="text-white/60">
                Premium smooth scrolling using Lenis to deliver buttery 60fps performance across the entire page layout.
              </p>
            </BentoItem>

            <BentoItem delay={0.1} className="md:col-span-2">
              <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }} className="font-semibold mb-4">
                Canvas Sequences
              </h2>
              <p className="text-white/60 text-lg">
                High-resolution image sequences mapped directly to the scroll timeline. We load and draw frames to a highly optimized canvas for maximum fidelity and zero stuttering.
              </p>
            </BentoItem>
          </BentoGrid>
        </section>

      </div>
    </main>
  );
}
