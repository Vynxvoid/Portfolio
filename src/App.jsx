import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'

const projects = [
  {
    number: '01',
    title: 'Archive Zero',
    category: 'Brand System / Fashion Label',
    image: '/assets/images/project-1.jpg',
    url: 'https://github.com/vynxvoid',
  },
  {
    number: '02',
    title: 'Signal Frames',
    category: 'Motion Direction / Campaign',
    image: '/assets/images/project-2.jpg',
    url: 'https://github.com/vynxvoid',
  },
  {
    number: '03',
    title: 'Depth Study',
    category: 'Interactive Portfolio / Web',
    image: '/assets/images/project-3.jpg',
    url: 'https://github.com/vynxvoid',
  },
  {
    number: '04',
    title: 'Margin Notes',
    category: 'Editorial Design / Print',
    image: '/assets/images/project-4.jpg',
    url: 'https://github.com/vynxvoid',
  },
]

const testimonials = [
  {
    quote:
      'They gave our launch a pulse. The identity felt expensive, unforced, and instantly recognizable.',
    name: 'Asha Mehra / Sabi Studio',
    variant: 'light',
  },
  {
    quote:
      'Our site stopped feeling like a portfolio and started acting like a point of view.',
    name: 'Karan Jain / Field Notes',
    variant: 'dark',
  },
  {
    quote:
      'Sharp thinking, immaculate details, and motion that made the story land without noise.',
    name: 'Leena Roy / Current Form',
    variant: 'light',
  },
]

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="bg-[var(--color-white)] text-[var(--color-black)]">
      <CustomCursor />
      <AnimatePresence>{isLoading ? <LoadingScreen /> : null}</AnimatePresence>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage revealReady={!isLoading} testimonials={testimonials} />} />
          <Route path="/projects" element={<ProjectsPage revealReady={!isLoading} projects={projects} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
