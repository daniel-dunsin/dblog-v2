import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    CreateBlogPage,
    EditBlog,
    EditUser,
    Home,
    Login,
    Signup,
    SingleBlog,
    SingleUser
} from './pages';
import { Navbar, Footer, ProtectedRoute } from './components'

function App() {
    return <Router>
        <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/login' element={<Login />} />

            <Route path='/signup' element={<Signup />} />

            <Route path='/blog/create' element={
                <ProtectedRoute>
                    <CreateBlogPage />
                </ProtectedRoute>
            } />

            <Route path='/blog/edit' element={
                <ProtectedRoute>
                    <EditBlog />
                </ProtectedRoute>
            } />

            <Route path='/blog/:id' element={<SingleBlog />} />

            <Route path='/user/:id' element={<SingleUser />} />

            <Route path='/user/edit/:id' element={
                <ProtectedRoute>
                    <EditUser />
                </ProtectedRoute>
            } />
        </Routes>
    </Router>
}

export default App;
