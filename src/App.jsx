import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Layout from './Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<h1>Home</h1>} />
          <Route path="users/:userId/followers" element={<h1>Quem me segue</h1>} />
          <Route path="users/:userId/followed" element={<h1>Quem eu sigo</h1>} />
          <Route path="users/:userId/feed" element={<h1>Feed de publicações</h1>} />
          <Route path="publish" element={<h1>Criar publicação</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
