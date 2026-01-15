import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './pages/Layout'
import Home from './pages/Home'
import PostFeed from './pages/PostFeed'
import WhoFollowsMe from './pages/WhoFollowsMe'
import WhoDoIFollow from './pages/WhoDoIFollow'
import CreatePublication from './pages/CreatePublication'
import { UserProvider } from "./contexts/UsersContext";
import ProtectedPages from './pages/ProtectedPages'


function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />

            <Route path='/' element={<ProtectedPages rule="SELLER" />}>
              <Route path="users/:userId/followers" element={<WhoFollowsMe />} />
            </Route>

            <Route path='/' element={<ProtectedPages />}>
              <Route path="users/:userId/followed" element={<WhoDoIFollow />} />
            </Route>

            <Route path='/' element={<ProtectedPages />}>
              <Route path="users/:userId/feed" element={<PostFeed />} />
            </Route>

            <Route path='/' element={<ProtectedPages rule="SELLER" />}>
              <Route path="publish" element={<CreatePublication />} />
            </Route>
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
