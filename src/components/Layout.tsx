import { useState, type FormEvent } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'

function Header() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    navigate(`/list?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <header>
      <div className="header-bar">
        <Link to="/" className="brand">
          ar<span className="brand-x">X</span>iv
          <span className="brand-concept">concept</span>
        </Link>
        <form className="search" onSubmit={onSubmit}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search titles, authors, abstracts…"
            aria-label="Search"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <nav className="subnav">
        <NavLink to="/list">Browse</NavLink>
        <NavLink to="/guidelines">Submission Guidelines</NavLink>
        <NavLink to="/funding">Funding Landscape</NavLink>
        <NavLink to="/implications">Reasons &amp; Implications</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  )
}

export default function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <footer className="footer">
        Concept mockup of a redesigned arXiv for a university ethics course project. Not affiliated with or endorsed by
        arXiv or Cornell University. All papers, authors, and reviews shown are synthetic.
      </footer>
    </>
  )
}
