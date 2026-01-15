import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Layout from './pages/Layout'
import Home from './pages/Home'
import PostFeed from './pages/PostFeed'
import WhoFollowsMe from './pages/WhoFollowsMe'
import WhoDoIFollow from './pages/WhoDoIFollow'
import CreatePublication from './pages/CreatePublication'
import { UserProvider } from "./contexts/UsersContext";


function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="users/:userId/followers" element={<WhoFollowsMe />} />
            <Route path="users/:userId/followed" element={<WhoDoIFollow />} />
            <Route path="users/:userId/feed" element={<PostFeed />} />
            <Route path="publish" element={<CreatePublication />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
