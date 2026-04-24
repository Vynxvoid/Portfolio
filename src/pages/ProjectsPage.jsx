import React from 'react'
import ProjectsHero from '../components/ProjectsHero'
import Marquee from '../components/Marquee'
import Work from '../components/Work'

export default function ProjectsPage({ revealReady, projects }) {
  return (
    <>
      <ProjectsHero revealReady={revealReady} />
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
      <Work projects={projects} />
    </>
  )
}
