import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="report">
      <h1>Not found</h1>
      <p>
        That page or paper doesn't exist. <Link to="/list">Browse all submissions</Link>.
      </p>
    </div>
  )
}
