import { Hero } from '@/components/Hero'
import { InfoBlocks } from '@/components/InfoBlocks'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { SpotifyPlayer } from '@/components/SpotifyPlayer'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <InfoBlocks />
      <About />
      <Skills />
      <Projects />
      <SpotifyPlayer />
      <Footer />
    </>
  )
} 