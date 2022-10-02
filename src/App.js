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
import { Navbar, Footer, Sidebar, ProtectedRoute } from './components'

function App() {
    return <Router>
        <Navbar />
        <Sidebar />
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

            <Route path='/user/edit' element={
                <ProtectedRoute>
                    <EditUser />
                </ProtectedRoute>
            } />
        </Routes>
        <Footer />
    </Router>
}

export default App;
