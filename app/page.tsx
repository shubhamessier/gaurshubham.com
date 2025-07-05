"use client"

import {
  Download,
  Mail,
  MapPin,
  ExternalLink,
  Github,
  Circle,
  Linkedin,
  Key,
  ChevronDown,
  Pen,
  ChevronUp,
  Copy,
  Check,
  Smile,
  Menu,
  X,
  BookOpen,
  Twitter,
  Instagram,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import portfolioData from "../data/portfolio.json"

export default function Portfolio() {
  const [aboutExpanded, setAboutExpanded] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState("")
  const [konamiSequence, setKonamiSequence] = useState<string[]>([])
  const [easterEggActive, setEasterEggActive] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentStatus, setCurrentStatus] = useState({
    availability: portfolioData.status.availability,
    currentWork: portfolioData.status.currentWork,
    lastUpdated: new Date(),
  })

  // Add state for tracking time since last update
  const [timeSinceUpdate, setTimeSinceUpdate] = useState("just now")
  const [copiedPublicKey, setCopiedPublicKey] = useState(false)

  // Add useEffect to update the "time since" automatically
  useEffect(() => {
    const updateTimeSince = () => {
      const now = new Date()
      const diffInMinutes = Math.floor((now.getTime() - currentStatus.lastUpdated.getTime()) / (1000 * 60))

      if (diffInMinutes < 1) {
        setTimeSinceUpdate("just now")
      } else if (diffInMinutes < 60) {
        setTimeSinceUpdate(`${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`)
      } else if (diffInMinutes < 1440) {
        // less than 24 hours
        const hours = Math.floor(diffInMinutes / 60)
        setTimeSinceUpdate(`${hours} hour${hours === 1 ? "" : "s"} ago`)
      } else {
        const days = Math.floor(diffInMinutes / 1440)
        setTimeSinceUpdate(`${days} day${days === 1 ? "" : "s"} ago`)
      }
    }

    // Update immediately
    updateTimeSince()

    // Update every minute
    const interval = setInterval(updateTimeSince, 60000)

    return () => clearInterval(interval)
  }, [currentStatus.lastUpdated])

  // Konami Code sequence
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",

  ]

  // Copy email function
  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email)
      setCopiedEmail(email)
      setTimeout(() => setCopiedEmail(""), 2000)
    } catch (err) {
      console.log("Failed to copy email")
    }
  }

  // Copy public key function
  const copyPublicKey = async () => {
    const publicKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

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
C6zD8tk=
=loyZ
-----END PGP PUBLIC KEY BLOCK-----`

    try {
      await navigator.clipboard.writeText(publicKey)
      setCopiedPublicKey(true)
      setTimeout(() => setCopiedPublicKey(false), 3000)
    } catch (err) {
      console.log("Failed to copy public key")
    }
  }

  // Easter egg effects
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newSequence = [...konamiSequence, event.code].slice(-10)
      setKonamiSequence(newSequence)

      if (newSequence.join(",") === konamiCode.join(",")) {
        setEasterEggActive(true)
        document.body.style.animation = "rainbow 2s infinite"
        setTimeout(() => {
          setEasterEggActive(false)
          document.body.style.animation = ""
        }, 5000)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [konamiSequence])

  // Console Easter Eggs
  useEffect(() => {
    console.log(`
    🎯 Hey there, fellow developer! 
    
    Welcome to my portfolio's console. Here are some fun facts:
    • This site is built with Next.js 15 and Tailwind CSS
    • Try the Konami Code: ↑↑↓↓←→←→BA
    • I'm currently ${currentStatus.currentWork.toLowerCase()}
    • Always happy to chat about tech, astrophotography, or Pink Floyd!
    
    Want to connect? Drop me a line at ${portfolioData.personal.email}
  `)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {easterEggActive && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          <p className="font-body text-sm">🎉 Konami Code activated! You found the Easter egg!</p>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="font-heading text-xl sm:text-xl font-normal text-gray-900">
              SG
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors font-body text-base">
                About
              </a>
              <a href="#experience" className="text-gray-600 hover:text-gray-900 transition-colors font-body text-base">
                Experience
              </a>
              <a href="#projects" className="text-gray-600 hover:text-gray-900 transition-colors font-body text-base">
                Projects
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors font-body text-base">
                Contact
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <div className="flex flex-col space-y-4">
                <a
                  href="#about"
                  className="text-gray-600 hover:text-gray-900 transition-colors font-body text-base px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#experience"
                  className="text-gray-600 hover:text-gray-900 transition-colors font-body text-base px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Experience
                </a>
                <a
                  href="#projects"
                  className="text-gray-600 hover:text-gray-900 transition-colors font-body text-base px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-gray-900 transition-colors font-body text-base px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <a href={portfolioData.personal.resume}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-800 text-gray-800 hover:bg-gray-50 bg-transparent font-body text-sm px-4 py-2 w-fit"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Content Container */}
      <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12">
        {/* Hero Section */}
        <section className="mt-0  sm:mt-14 py-16 sm:py-24 lg:py-18">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-6xl font-normal text-gray-900 mb-8 sm:mb-12 tracking-normal">
              {portfolioData.personal.name}
            </h1>
            <p className="font-body text-lg sm:text-xl lg:text-2xl text-gray-700 mb-8 sm:mb-12 leading-relaxed">
              {portfolioData.personal.title}
            </p>  

            {/* Location and Status */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600 mb-12 sm:mb-16 font-body text-base space-y-6 sm:space-y-0">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>{portfolioData.personal.location}</span>
              </div>

              {/* Live Status */}
              <div className="flex items-center space-x-3 bg-green-50 mt-4 px-4 py-2 rounded-full border border-green-200 w-fit">
                <div className="flex items-center space-x-2">
                  <Circle className="w-3 h-3 fill-green-500 text-green-500 animate-pulse flex-shrink-0" />
                  <span className="text-sm font-medium text-green-700">{currentStatus.availability}</span>
                </div>
              </div>
            </div>

            {/* Current Work Status */}
            <div className="mb-8 sm:mb-12 p-4 bg-gray-50 rounded-lg border-gray-900">
              <p className="font-body text-base text-gray-700">
                <span className="font-medium">Currently:</span> {currentStatus.currentWork}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
  <a href="#experience" className="w-full sm:w-auto">
    <Button
      className="w-full sm:min-w-[160px] flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base font-body bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 transition-colors rounded-2xl shadow-sm"
    >
      <Briefcase className="w-5 h-5" />
      My Work
    </Button>
  </a>

  <a href="#about" className="w-full sm:w-auto">
    <Button
      variant="outline"
      className="w-full sm:min-w-[160px] flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base font-body text-gray-900 border border-gray-300 hover:bg-gray-100 transition-colors rounded-2xl shadow-sm"
    >
      <Smile className="w-5 h-5" />
      About Me
    </Button>
  </a>

  <div className="w-full sm:w-auto">
    <Button
      variant="outline"
      className="w-full sm:min-w-[160px] flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base font-body text-gray-900 border border-gray-300 hover:bg-gray-100 transition-colors rounded-2xl shadow-sm"
      onClick={() => window.open(portfolioData.personal.blog, "_blank")}
    >
      <Pen className="w-5 h-5" />
      Blog
    </Button>
  </div>
</div>

          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 sm:py-24 lg:py-32 bg-gray-50 -mx-6 md:-mx-12">
          <div className="max-w-[1140px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <h2 className="font-heading text-xl sm:text-3xl font-normal text-gray-900 mb-8 sm:mb-12">About</h2>
              <p className="font-body text-base text-gray-700 leading-relaxed mb-8 sm:mb-12">
                {portfolioData.about.summary}
              </p>

              <button
                onClick={() => setAboutExpanded(!aboutExpanded)}
                className="inline-flex items-center font-body text-base text-gray-600 hover:text-gray-900 transition-colors border-b border-gray-300 hover:border-gray-600 pb-1 mb-8"
              >
                {aboutExpanded ? "Show Less" : "About Me (Personal)"}
                {aboutExpanded ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
              </button>

              {aboutExpanded && (
                <div className="space-y-16 sm:space-y-16">
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-normal text-gray-900 mb-6">
                      Who are you anyways?
                    </h3>
                    <div className="space-y-6">
                      {portfolioData.about.whoAmI.split("\n\n").map((paragraph, index) => (
                        <p key={index} className="font-body text-base text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-normal text-gray-900 mb-6">I like living alone.</h3>
                    <p className="font-body text-base text-gray-700 leading-relaxed">
                      {portfolioData.about.alone}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-normal text-gray-900 mb-6">Entropy & Life</h3>
                    <p className="font-body text-base text-gray-700 leading-relaxed">
                      {portfolioData.about.philosophy}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-normal text-gray-900 mb-6">Reading List</h3>
                    <p className="font-body text-base text-gray-700 leading-relaxed mb-6">
                      Here are some of the books that have made the most impact on me:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        {portfolioData.readingList.slice(0, 4).map((book, index) => (
                          <p key={index} className="font-body text-base text-gray-700">
                            <em>{book.title}</em> — {book.author}
                          </p>
                        ))}
                      </div>
                      <div className="space-y-2">
                        {portfolioData.readingList.slice(4).map((book, index) => (
                          <p key={index} className="font-body text-base text-gray-700">
                            <em>{book.title}</em> — {book.author}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-normal text-gray-900 mb-6">Technology</h3>
                    <p className="font-body text-base text-gray-700 leading-relaxed">
                      {portfolioData.about.technology}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-normal text-gray-900 mb-6">
                      Timeline for context
                    </h3>
                    <div className="space-y-4">
                      {portfolioData.timeline.map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row">
                          <span className="font-body text-base font-medium text-gray-900 w-full sm:w-16 mb-1 sm:mb-0">
                            {item.year}
                          </span>
                          <span className="font-body text-base text-gray-700">{item.event}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-normal text-gray-900 mb-6">
                      I don't like stability
                    </h3>
                    <div className="space-y-6">
                      {portfolioData.about.stability.split("\n\n").map((paragraph, index) => (
                        <p key={index} className="font-body text-base text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-normal text-gray-900 mb-6">
                      Questions? Thoughts?
                    </h3>
                    <p className="font-body text-base text-gray-700 leading-relaxed">
                      Heya Stranger, I love talking to people, and I write back to every mail. you can write me{" "}
                      <a
                        href={`mailto:${portfolioData.personal.email}`}
                        className="text-gray-900 underline hover:text-gray-700 transition-colors"
                      >
                        here
                      </a>
                      .
                    </p>
                  </div>
                </div>
              )}

              {/* Connect Section */}
              <div className="mt-12 sm:mt-16">
                <h3 className="font-heading text-lg sm:text-xl font-normal text-gray-900 mb-6 sm:mb-8">Connect</h3>
                <p className="font-body text-base text-gray-700 mb-4 sm:mb-8 leading-relaxed">
     You can reach out to me on my socials, my email having the fastest response timing.
    </p>
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between group">
                      <a
                        href={`mailto:${portfolioData.personal.email}`}
                        className="flex items-center text-gray-700 hover:text-gray-900 transition-colors font-body text-base"
                      >
                        <Mail className="w-5 h-5 mr-4 flex-shrink-0" />
                        <span className="break-all">{portfolioData.personal.email}</span>
                      </a>
                      <button
                        onClick={() => copyEmail(portfolioData.personal.email)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 rounded flex-shrink-0"
                        title="Copy email"
                      >
                        {copiedEmail === portfolioData.personal.email ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                    <a
                      href={portfolioData.personal.linkedin}
                      className="flex items-center text-gray-700 hover:text-gray-900 transition-colors font-body text-base"
                    >
                      <Linkedin className="w-5 h-5 mr-4 flex-shrink-0" />
                      <span className="break-all">linkedin.com/in/shubhamgaur10</span>
                    </a>
                    <a
                      href={portfolioData.personal.twitter}
                      className="flex items-center text-gray-700 hover:text-gray-900 transition-colors font-body text-base"
                    >
                      <Twitter className="w-5 h-5 mr-4 flex-shrink-0" />
                      <span className="break-all">x.com/0xshubhamgaur</span>
                    </a>
                  </div>
                  <div className="space-y-4">
                    <a
                      href={portfolioData.personal.github}
                      className="flex items-center text-gray-700 hover:text-gray-900 transition-colors font-body text-base"
                    >
                      <Github className="w-5 h-5 mr-4 flex-shrink-0" />
                      <span className="break-all">github.com/shubhamessier</span>
                    </a>
                    <a
                      href={portfolioData.personal.website}
                      className="flex items-center text-gray-700 hover:text-gray-900 transition-colors font-body text-base"
                    >
                      <ExternalLink className="w-5 h-5 mr-4 flex-shrink-0" />
                      <span className="break-all">gaurshubham.com</span>
                    </a>
                    <a
                      href={portfolioData.personal.instagram}
                      className="flex items-center text-gray-700 hover:text-gray-900 transition-colors font-body text-base"
                    >
                      <Instagram className="w-5 h-5 mr-4 flex-shrink-0" />
                      <span className="break-all">instagram.com/shubham.git</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-normal text-gray-900 mb-12 sm:mb-16 lg:mb-20">
              Experience
            </h2>
            <div className="space-y-12 lg:space-y-16">
              {portfolioData.experience.map((job, index) => (
                <div key={index} className="group">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="font-heading text-lg sm:text-xl font-normal text-gray-900 mb-1">{job.title}</h3>
                      <p className="font-body text-base text-gray-600 italic mb-2">
                        {job.companyUrl ? (
                          <a
                            href={job.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-900 transition-colors underline decoration-dotted"
                          >
                            {job.company}
                          </a>
                        ) : (
                          job.company
                        )}
                      </p>
                      <p className="font-body text-sm text-gray-500 lg:hidden">
                        {job.period} • {job.location}
                      </p>
                    </div>
                    <div className="hidden lg:block text-right flex-shrink-0 ml-8">
                      <p className="font-body text-base text-gray-600 mb-1">{job.period}</p>
                      <p className="font-body text-sm text-gray-500">{job.location}</p>
                    </div>
                  </div>
                  <div className="space-y-3 pl-0 lg:pl-4 border-l-0 lg:border-l-2 border-gray-100">
                    {job.responsibilities.map((responsibility, respIndex) => (
                      <p key={respIndex} className="font-body text-base text-gray-700 leading-relaxed">
                        • {responsibility}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Skills Section */}
        <section className="py-16 sm:py-24 lg:py-32 bg-gray-50 -mx-6 md:-mx-12">
          <div className="max-w-[1140px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <h2 className="font-heading text-2xl sm:text-3xl font-normal text-gray-900 mb-12 sm:mb-16 lg:mb-20">
                Technical Skills
              </h2>
              <div className="grid sm:grid-cols-2 gap-12 lg:gap-16">
                <div className="space-y-8 sm:space-y-12">
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-normal text-gray-900 mb-4 sm:mb-6">
                      Languages
                    </h3>
                    <p className="font-body text-base text-gray-700 leading-relaxed">
                      {portfolioData.skills.languages}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-normal text-gray-900 mb-4 sm:mb-6">
                      Web & App Development
                    </h3>
                    <p className="font-body text-base text-gray-700 leading-relaxed">
                      {portfolioData.skills.webDevelopment}
                    </p>
                  </div>
                </div>
                <div className="space-y-8 sm:space-y-12">
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-normal text-gray-900 mb-4 sm:mb-6">ML & AI</h3>
                    <p className="font-body text-base text-gray-700 leading-relaxed">{portfolioData.skills.mlAi}</p>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-normal text-gray-900 mb-4 sm:mb-6">
                      Tools & Cloud
                    </h3>
                    <p className="font-body text-base text-gray-700 leading-relaxed">
                      {portfolioData.skills.toolsCloud}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-8 sm:py-24 lg:py-24">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-normal text-gray-900 mb-12 sm:mb-16 lg:mb-20">
              Selected Projects
            </h2>
            <div className="space-y-12 lg:space-y-16">
              {portfolioData.projects.map((project, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <h3 className="font-heading text-lg sm:text-xl font-normal text-gray-900 mb-2">
                        {project.url ? (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-700 transition-colors underline decoration-dotted"
                          >
                            <em>{project.title}</em>
                          </a>
                        ) : (
                          <em>{project.title}</em>
                        )}
                      </h3>
                      {project.status && <p className="font-body text-sm text-gray-600 mb-3">{project.status}</p>}
                    </div>
                  </div>

                  <p className="font-body text-base text-gray-700 leading-relaxed mb-4">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-body bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Achievements */}
        <section className="py-16 sm:py-24 lg:py-32 bg-gray-50 -mx-6 md:-mx-12">
          <div className="max-w-[1140px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-normal text-gray-900 mb-8 sm:mb-12">
                    Education
                  </h2>
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-normal text-gray-900 mb-3">
                      <a
                        href={portfolioData.education.institutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-700 transition-colors underline decoration-dotted"
                      >
                        <em>{portfolioData.education.institution}</em>
                      </a>
                    </h3>
                    <p className="font-body text-base text-gray-700 mb-2">{portfolioData.education.degree}</p>
                    <p className="font-body text-sm text-gray-600">{portfolioData.education.period}</p>
                  </div>
                </div>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-normal text-gray-900 mb-8 sm:mb-12">
                    Achievements
                  </h2>
                  <div className="space-y-6 sm:space-y-8">
                    {portfolioData.achievements.map((achievement, index) => (
                      <div key={index}>
                        <p className="font-body text-base text-gray-700 leading-relaxed">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 sm:py-24 lg:py-32">
  <div className="max-w-3xl">
    <h2 className="font-heading text-2xl sm:text-3xl font-normal text-gray-900 mb-8 sm:mb-12">
      Let's Work Together
    </h2>
    <p className="font-body text-base text-gray-700 mb-12 sm:mb-16 leading-relaxed">
      I'm always looking to meet new people, discuss ideas, or just chat over a chai/coffee. At the end everybody wants a little more spontaneity/entropy in their life isn't it?
    </p>

    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start flex-wrap">

      {/* Download Resume Button */}
  
      <a href={portfolioData.personal.resume}>
      <Button className="bg-white border border-gray-900 hover:bg-gray-100 text-gray-800 px-6 py-3 font-body text-base min-w-[220px] flex items-center justify-center shadow-sm rounded-md">
        <Download className="w-5 h-5 " />
        Download Resume
      </Button>
      </a>

      {/* Email Copy Button */}
      <Button
        onClick={() => copyEmail(portfolioData.personal.email)}
        className="bg-white border border-gray-900 hover:bg-gray-100 text-gray-800 px-6 py-3 font-body text-base min-w-[220px] flex items-center justify-center shadow-sm rounded-md"
      >
        {copiedEmail === portfolioData.personal.email ? (
          <Check className="w-5 h-5 text-green-600" />
        ) : (
          <Copy className="w-5 h-5 text-gray-900" />
        )}
        Copy Email
      </Button>

      {/* PGP Key Copy Button */}
      <Button
        onClick={copyPublicKey}
        className="bg-white border border-gray-900 hover:bg-gray-100 text-gray-800 px-6 py-3 font-body text-base min-w-[220px] flex items-center justify-center shadow-sm rounded-md"
      >
        {copiedPublicKey ? (
          <Check className="w-5 h-5 mr-2 text-green-600" />
        ) : (
          <Key className="w-5 h-5  text-gray-500" />
        )}
        Copy PGP Key
      </Button>

    </div>
  </div>
</section>



        {/* Footer */}
        <footer className="py-12 sm:py-16 border-t border-gray-100">
          <div className="max-w-3xl">
            <p className="font-body text-sm text-gray-600">
              © 2025 {portfolioData.personal.name}. 
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
