import { HelmetProvider } from 'react-helmet-async'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import CodingProfiles from './sections/CodingProfiles'
import Education from './sections/Education'
import Resume from './sections/Resume'
import Contact from './sections/Contact'
import personal from './data/personal'

const META_DESCRIPTION =
  'Ankush Kumar is a Java Backend Developer and B.Tech IT student at BKBIET Pilani. Experienced in Spring Boot, REST APIs, PostgreSQL, DSA, and IBM watsonx.ai. Available for internships and software developer roles.'

function Portfolio() {
  return (
    <>
      <Helmet>
        <title>Ankush Kumar | Java Backend Developer</title>
        <meta name="description" content={META_DESCRIPTION} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={personal.canonicalUrl} />
        <meta property="og:title" content="Ankush Kumar | Java Backend Developer" />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:image" content={`${personal.canonicalUrl}/og-image.png`} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ankush Kumar | Java Backend Developer" />
        <meta name="twitter:description" content={META_DESCRIPTION} />
        <meta name="twitter:image" content={`${personal.canonicalUrl}/og-image.png`} />
        {/* Canonical */}
        <link rel="canonical" href={personal.canonicalUrl} />
        {/* Keywords */}
        <meta
          name="keywords"
          content="Ankush Kumar, Java developer, Spring Boot, backend developer, BKBIET, REST API, PostgreSQL, DSA, IBM watsonx"
        />
      </Helmet>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CodingProfiles />
        <Education />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <Portfolio />
    </HelmetProvider>
  )
}
