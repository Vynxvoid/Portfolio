import React from "react";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import About from "../components/About";
import Testimonials from "../components/Testimonials";

export default function HomePage({ revealReady, testimonials }) {
  return (
    <>
      <Hero revealReady={revealReady} />
      <Marquee
        items={[
          "AI/ML Engineering",
          "Data Mining",
          "FullStack Development",
          "Competitive Programming",
          "Problem Solving",
          "Mathematics"
        ]}
        className="bg-[var(--color-black)] text-[var(--color-white)] -rotate-[2deg]"
        textClassName="text-[28px]"
        speed={32}
        dataCursorZone="lime"
      />
      <About />
      {/* <Testimonials testimonials={testimonials} /> */}
    </>
  );
}
