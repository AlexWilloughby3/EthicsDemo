import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ListingPage from './pages/ListingPage'
import AbstractPage from './pages/AbstractPage'
import ReaderPage from './pages/ReaderPage'
import GuidelinesPage from './pages/GuidelinesPage'
import ReportPage from './pages/ReportPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="list" element={<ListingPage />} />
          <Route path="list/:category" element={<ListingPage />} />
          <Route path="abs/:id" element={<AbstractPage />} />
          <Route path="html/:id" element={<ReaderPage />} />
          <Route path="guidelines" element={<GuidelinesPage />} />
          <Route path="funding" element={<ReportPage name="funding" />} />
          <Route path="implications" element={<ReportPage name="implications" />} />
          <Route path="about" element={<ReportPage name="about" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
