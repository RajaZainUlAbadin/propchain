import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Layout/Navbar';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { DashboardPage } from './pages/DashboardPage';
import { useWallet } from './context/WalletContext';

const AppContent: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const {account} = useWallet();
  const [favorites, setFavorites] = useState(['1', '4']);
  const navigate = useNavigate();

  useEffect(() => {
    if (account) {
      navigate("/dashboard");
    } else {
      // If the user disconnects (no wallet), navigates to home
      navigate("/");
    }
  }, [account, navigate]);
  
  const handleConnectWallet = () => {
    // Mock wallet connection with animation
    setTimeout(() => {
      setWalletConnected(!walletConnected);
    }, 1000);
  };

  const handleToggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <>
      <Navbar />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          } 
        />
        <Route 
          path="/listings" 
          element={
            <ListingsPage 
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          } 
        />
        <Route 
          path="/property/:id" 
          element={<PropertyDetailPage onToggleFavorite={handleToggleFavorite} />} 
        />
        <Route 
          path="/favorites" 
          element={
            <FavoritesPage 
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          } 
        />
        {account &&
        <Route 
        path="/dashboard" 
        element={
          <DashboardPage 
          walletConnected={walletConnected}
          onConnectWallet={handleConnectWallet}
          />
        } 
        />
      }
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;