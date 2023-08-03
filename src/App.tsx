import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import ProtectedRoute from './components/Common/ProtectedRoute';
import { useSession } from './providers/Auth';
import LayeredLoading from './components/Common/LayeredLoading';

function App() {

  const { loading } = useSession();

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signin' element={<Signin />}/>
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<Dashboard />}/>
          </Route>
        </Routes>
        {loading &&
          <LayeredLoading />
        }
      </BrowserRouter>
    </div>
  )
}

export default App
