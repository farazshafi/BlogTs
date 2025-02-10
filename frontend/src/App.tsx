import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Intro from './Pages/Intro'
import Explore from './Pages/Explore'
import BlogDetail from './Pages/BlogDetail'
import CreateBlog from './Pages/CreateBlog'
import { Toaster } from 'sonner'

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster richColors />

        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/explore" element={<Explore />} /> 
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/create_blog" element={<CreateBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App