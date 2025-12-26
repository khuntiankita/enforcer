// src/components/AuthRouter.js
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

// Import all your page/view components
import HomePage from '../views/Home';
import LoginPage from '../views/Login';
import RegisterPage from '../views/Register';
import Request from '../views/Request';
import Book from '../views/Book';
import SupplierList from '../views/Suppliers';
import Workers from '../views/Workers';
import Dashboard from '../views/dashboard/layout';
import UserDashboard from '../views/dashboard/User';
import WorkerDashboard from '../views/dashboard/Worker';
import ContractorDashboard from '../views/dashboard/Contractor';
import SupplierDashboard from '../views/dashboard/Supplier';
import UpdateProfile from '../views/dashboard/updateProfile';
// Import your protected route component
import ProtectedRoute from './ProtectedRoute';
import Sidebar from './sidebar';

function AuthRouter() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Determine the default dashboard path based on the user's role
  const getDashboardPath = (role) => {
    switch (role) {
      case 'User': return '/userDashboard';
      case 'Contractor': return '/contractorDashboard';
      case 'Worker': return '/workerDashboard';
      case 'Supplier': return '/supplierDashboard';
      default: return '/home';
    }
  };

  const dashboardPath = user && user.role ? getDashboardPath(user.role) : '/home';

  return (
    <Routes>
      {/* Public routes accessible to everyone */}
      <Route path='/' element={<HomePage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/book' element={<Book />} />
      <Route path='/SupplierList' element={<SupplierList />} />
      <Route path='/WorkerList' element={<Workers />} />
      <Route path='/Request' element={<Request/>} />

      {/* Redirect logged-in users away from login/register pages */}
      <Route path='/login' element={user ? <Navigate to={dashboardPath} /> : <LoginPage />} />
      <Route path='/register' element={user ? <Navigate to={dashboardPath} /> : <RegisterPage />} />

      {/* Protected routes */}
      <Route path='/userDashboard' element={
        <ProtectedRoute allowedRoles={['User']}>
          <Sidebar />
          <UserDashboard />
        </ProtectedRoute>
      } />
      <Route path='/workerDashboard' element={
        <ProtectedRoute allowedRoles={['Worker']}>
          <Sidebar />
          <WorkerDashboard />
        </ProtectedRoute>
      } />
      <Route path='/supplierDashboard' element={
        <ProtectedRoute allowedRoles={['Supplier']}>
          <Sidebar />
          <SupplierDashboard />
        </ProtectedRoute>
      } />
      <Route path='/contractorDashboard' element={
        <ProtectedRoute allowedRoles={['Contractor']}>
          <Sidebar />
          <ContractorDashboard />
        </ProtectedRoute>
      } />
      <Route path="/update-profile" element={
        <ProtectedRoute><UpdateProfile /></ProtectedRoute>
      } />
      <Route path='/Dashboard' element={
        <ProtectedRoute>
          <Sidebar />
          <Dashboard />
        </ProtectedRoute>
      } />

      {/* Wildcard route to handle not-found or redirect based on auth */}
      <Route path="*" element={
        user ? <Navigate to={dashboardPath} /> : <Navigate to="/login" />
      } />
    </Routes>
  );
}

export default AuthRouter;
