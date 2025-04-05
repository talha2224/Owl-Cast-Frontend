
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import LoaderGif from './assets/loader.gif';
import PodcastPage from './pages/Dashboard/PodcastPage';
import SinglePage from './pages/Dashboard/SinglePage';
import MusicPage from './pages/Dashboard/MusicPage';
import LibraryPage from './pages/Dashboard/LibraryPage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/Dashboard/ProfilePage';


import LoginPage from './pages/Auth/LoginPage';
import AdminHomePage from './pages/Admin/Dashboard/AdminHomePage';
import AdminTransactionage from './pages/Admin/Dashboard/AdminTransactionage';
import AdminUserPage from './pages/Admin/Dashboard/AdminUserPage';

const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const Layout = lazy(() => import('./components/dashboard/Layout'));
const HomePage = lazy(() => import('./pages/Dashboard/HomePage'));
const AdminLayout = lazy(() => import('./components/admin/Layout'));


function SuspenseWithDelay({ children, fallback, delay = 0, minDisplayTime = 2000 }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), minDisplayTime);
    return () => clearTimeout(timer);
  }, [minDisplayTime]);

  return isLoading ? (
    <div className="flex justify-center items-center w-screen h-screen">
      <img src={LoaderGif} alt="Loading..." className="h-[6rem]" />
    </div>
  ) : (
    <Suspense fallback={fallback}>{children}</Suspense>
  );
}

function App() {

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <SuspenseWithDelay fallback={<div className="flex justify-center items-center w-screen h-screen"><img src={LoaderGif} alt="HopOn Dashboard- Loader" className="h-[6rem]" /></div>} minDisplayTime={2000}>

          <Routes>
            
            <Route path="/admin/dashboard/" element={<AdminLayout />}>
              <Route path="home" element={<AdminHomePage />} />
              <Route path="user" element={<AdminUserPage />} />
              <Route path="transaction" element={<AdminTransactionage />} />
            </Route>


            <Route path='/' element={<LandingPage />} />

            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />


            <Route path="/dashboard/" element={<Layout />}>
              <Route path="home" element={<HomePage />} />
              <Route path="podcast" element={<PodcastPage />} />
              <Route path="podcast/single/:id" element={<SinglePage />} />
              <Route path="music" element={<MusicPage />} />
              <Route path="library" element={<LibraryPage />} />
              <Route path="profile" element={<ProfilePage/>} />
            </Route>


          </Routes>
        </SuspenseWithDelay>
      </BrowserRouter>
    </>
  );
}

export default App;
