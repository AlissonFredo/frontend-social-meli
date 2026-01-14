import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Layout from './pages/Layout'
import Home from './pages/Home'
import PostFeed from './pages/PostFeed'
import WhoFollowsMe from './pages/WhoFollowsMe'
import WhoDoIFollow from './pages/WhoDoIFollow'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="users/:userId/followers" element={<WhoFollowsMe />} />
          <Route path="users/:userId/followed" element={<WhoDoIFollow />} />
          <Route path="users/:userId/feed" element={<PostFeed />} />
          <Route path="publish" element={<h1>Criar publicação</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
