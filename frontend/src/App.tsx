import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Intro from './Pages/Intro'
import Explore from './Pages/Explore'
import BlogDetail from './Pages/BlogDetail'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App