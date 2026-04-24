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
    title: 'Cryptomoon',
    category: 'Bitcoin Prediction / AI-ML ',
    image: '/assets/images/project-1.jpg',
    url: 'https://cryptomoon.onrender.com/',
    githubUrl: 'https://github.com/vynxvoid/cryptomoon',
  },
  {
    number: '02',
    title: 'Gloaf',
    category: 'Food Ordering Application / FullStack',
    image: '/assets/images/project-2.jpg',
    url: 'https://gloaf.onrender.com/',
    githubUrl: 'https://github.com/vynxvoid/gloaf',
  },
  {
    number: '03',
    title: 'Plutus.AI',
    category: 'Credit score predictor / Rag + LLM / AI-ML',
    image: '/assets/images/project-3.jpg',
    url: 'https://plutus-ai-snowy.vercel.app/',
    githubUrl: 'https://github.com/Vynxvoid/Plutus.ai',
  },
  {
    number: '04',
    title: 'Mercurius',
    category: 'Multicategory Rental / FullStack',
    image: '/assets/images/project-4.jpg',
    url: 'https://github.com/vynxvoid',
    githubUrl: 'https://github.com/Vynxvoid/Mercurius',
  },
  {
    number: '05',
    title: 'Freight Share',
    category: 'Logistic Middleman / FullStack',
    image: '/assets/images/project-5.jpg',
    url: 'https://freight-share.vercel.app/',
    githubUrl: 'https://github.com/Vynxvoid/FreightShare',
  },
  {
    number: '06',
    title: 'Legend of Old Monk',
    category: '2D Pixle game / JS OOPs',
    image: '/assets/images/project-6.jpg',
    url: 'https://oldmonklegend.netlify.app/',
    githubUrl: 'https://github.com/Vynxvoid/The-Legend-of-Old-Monk.',
  },
  {
    number: '07',
    title: 'Music Plate.io',
    category: 'Music plate game / Python-PyGame',
    image: '/assets/images/project-7.jpg',
    url: 'https://github.com/Vynxvoid/Music_Plates.io/archive/main.zip',
    githubUrl: 'https://github.com/Vynxvoid/Music_Plates.io',
  },
  {
    number: '08',
    title: 'Exam Timer',
    category: 'Question based Timer / Python',
    image: '/assets/images/project-8.jpg',
    url: 'https://github.com/Vynxvoid/Exam_Timer/archive/main.zip',
    githubUrl: 'https://github.com/Vynxvoid/Exam_Timer',
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
      'Our site stopped feeling like a portfolio and started acting like a point of view.',
    name: 'Karan Jain / Field Notes',
    variant: 'dark',
  },
  {
    quote:
      'Our site stopped feeling like a portfolio and started acting like a point of view.',
    name: 'Karan Jain / Field Notes',
    variant: 'dark',
  },
  {
    quote:
      'Our site stopped feeling like a portfolio and started acting like a point of view.',
    name: 'Karan Jain / Field Notes',
    variant: 'dark',
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
  {
    quote:
      'Sharp thinking, immaculate details, and motion that made the story land without noise.',
    name: 'Leena Roy / Current Form',
    variant: 'light',
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
