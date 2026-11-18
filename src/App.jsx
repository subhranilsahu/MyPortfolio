
import './App.css'
import { useEffect, useState, useRef, lazy, Suspense } from 'react'
const HeroScene = lazy(() => import('./components/HeroScene'))

const skills = [
  {
    number: '01',
    name: 'Development',
    tools: 'PYTHON / HTML / CSS / JAVASCRIPT',
    detail: 'I turn ideas into useful digital experiences, from small experiments to complete web applications.',
  },
  {
    number: '02',
    name: 'Photo editing',
    tools: 'IBIS PAINT X / LIGHTROOM',
    detail: 'I shape images with colour, light and detail to give each visual its own character.',
  },
  {
    number: '03',
    name: 'Video editing',
    tools: 'DAVINCI RESOLVE',
    detail: 'I bring footage, sound and rhythm together to tell a story that feels intentional.',
  },
]

const projects = [
  {
    number: '01',
    type: 'WEB APPLICATION · FLASK + SQLITE',
    name: 'Gareebi Tracker',
    detail: 'A personal finance tracker designed to make everyday money decisions easier.',
    tag: 'FINANCE',
  },
  {
    number: '02',
    type: 'CURRENTLY IN DEVELOPMENT',
    name: 'Something new is coming.',
    detail: 'A new creative project is taking shape. Stay tuned for what’s next.',
    tag: 'COMING SOON',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const cursorRef = useRef(null)

  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]')

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px -8% 0px',
      }
    )

    nodes.forEach((node) => {
      node.classList.remove('is-visible')
      observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current

    if (!cursor || !window.matchMedia('(pointer: fine)').matches) return

    const move = (event) => {
      cursor.style.left = `${event.clientX}px`
      cursor.style.top = `${event.clientY}px`

      const target = event.target

      cursor.classList.toggle(
        'is-hovering',
        Boolean(target.closest('a, button'))
      )
    }

    window.addEventListener('pointermove', move)

    return () => {
      window.removeEventListener('pointermove', move)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <main>
      <div className="custom-cursor" ref={cursorRef} aria-hidden="true" />

      <nav className="navbar">
        <a href="#home" className="logo" onClick={closeMenu}>
          SUBHRANIL<span>®</span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          type="button" 
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>

        <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#skills" onClick={closeMenu}>What I do</a>
          <a href="#projects" onClick={closeMenu}>Selected work</a>
        </div>

        <a
          href="https://www.linkedin.com/in/subhranil-sahu-42121a408/"
          target="_blank"
          rel="noreferrer"
          className="nav-cta"
        >
          LET'S TALK <span>↗</span>
        </a>
      </nav>

      <section className="hero" id="home">
        <div className="hero-grain" />

        <div className="hero-meta">
          <span>INDEPENDENT CREATIVE PORTFOLIO</span>
          <span>INDIA · 2026</span>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">
            <i /> DEVELOPER, EDITOR & CREATIVE THINKER
          </p>

          <h1>
            Making things<br />
            <em>that feel</em> <span>different.</span>
          </h1>

          <div className="hero-intro">
            <p>
              I make things, break things, and occasionally make something
              worth keeping. A little code, a little creativity, and whatever
              catches my interest.
            </p>

          </div>
        </div>

        <div className="character-caption">
          <span>THE CREATIVE SIDEKICK</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>

        <Suspense fallback={<div className="hero-scene" />}>
          <HeroScene />
        </Suspense>

        <div className="hero-orbit orbit-a" />
        <div className="hero-orbit orbit-b" />

        <div className="hero-number">01<span>—</span>04</div>
      </section>

      <section className="intro section" id="about">
        <div className="section-kicker" data-reveal>
          <span>01 / A LITTLE ABOUT ME</span>
          <span>THE PERSON BEHIND THE PIXELS</span>
        </div>

        <div className="intro-grid">
          <h2 data-reveal>
            Not just one<br />
            thing. <em>Many</em><br />
            possibilities.
          </h2>

          <div className="intro-copy" data-reveal>
            <p className="handwritten">Hey, I’m Subhranil.</p>
            <p>
              Usually making something, occasionally figuring out what I'm
              doing. I move between code, photos, videos, and whatever else
              seems interesting.
            </p>
            <p>
              No fixed lane, no big master plan. Just trying things,
              learning along the way, and seeing what comes out of it.
            </p>
            <p className="muted-note">
              Code is one canvas. Creativity is the bigger picture.
            </p>
          </div>
        </div>
      </section>

      <section className="skills section" id="skills">
        <div className="section-kicker" data-reveal>
          <span>02 / WHAT I BRING</span>
          <span>A FEW OF MY FAVOURITE TOOLS</span>
        </div>

        <div className="section-heading" data-reveal>
          <h2>A mix of <em>logic</em><br />& imagination.</h2>
          <p>Different mediums. Same obsession with making things better.</p>
        </div>

        <div className="skill-list">
          {skills.map((skill) => (
            <article
              className="skill-row"
              key={skill.number}
              data-reveal
            >
              <span className="skill-number">{skill.number}</span>

              <div>
                <h3>{skill.name}</h3>
                <p>{skill.detail}</p>
              </div>

              <span className="skill-tools">{skill.tools}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="projects section" id="projects">
        <div className="section-kicker" data-reveal>
          <span>03 / SELECTED WORK</span>
          <span>THINGS I’VE MADE</span>
        </div>

        <div className="section-heading" data-reveal>
          <h2>Ideas, meet <em>execution.</em></h2>
          <p>A few things I’ve built, with more on the way.</p>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <article
              className={`work-card work-${index + 1}`}
              key={project.number}
              data-reveal
            >
              <div className="work-visual">
                {index === 0 ? (
                  <div className="finance-art">
                    <div className="finance-top">
                      G / TRACKER <span>PERSONAL FINANCE</span>
                    </div>

                    <div className="finance-balance">
                      <small>AVAILABLE BALANCE</small>
                      <strong>₹ 24,850<span>.00</span></strong>
                    </div>

                    <div className="finance-bars">
                      <i /><i /><i /><i /><i /><i />
                      <i /><i /><i /><i /><i /><i />
                    </div>

                    <div className="finance-foot">
                      <span>INCOME <b>+₹32,000</b></span>
                      <span>EXPENSES <b>−₹7,150</b></span>
                    </div>
                  </div>
                ) : (
                  <div className="portfolio-art">
                    <div className="art-ring" />
                    <div className="art-orb" />
                    <span>CREATIVE<br />DIMENSION_02</span>
                    <b>3D</b>
                  </div>
                )}
              </div>

              <div className="work-info">
                <div>
                  <span className="work-type">{project.type}</span>
                  <h3>{project.name}</h3>
                  <p>{project.detail}</p>
                </div>

                <span className="work-tag">{project.tag}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="section-kicker" data-reveal>
          <span>04 / YOUR TURN</span>
          <span>HAVE SOMETHING IN MIND?</span>
        </div>

        <div className="contact-main" data-reveal>
          <p>GOOD IDEAS START WITH A HELLO.</p>
          <h2>
            Let’s make<br />
            <em>things</em><br />
            that matter.
          </h2>
          <a
            href="https://www.linkedin.com/in/subhranil-sahu-42121a408/"
            className="contact-button"
          >
            START A CONVERSATION
          </a>
        </div>

        <div className="contact-bottom">
          <span>SUBHRANIL® · INDIA</span>
          <a href="#home">BACK TO TOP ↑</a>
          <span>BUILT WITH CURIOSITY</span>
        </div>
      </section>
    </main>
  )
}

export default App
