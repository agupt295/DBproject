import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertBox from '../Components/AlertBox';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLogout = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to login page
    navigate('/');
  };

  const handleDeleteAccount = () => {
    setShowDeleteAlert(true);
  };

  const confirmDeleteAccount = async () => {
    setIsDeleting(true);

    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      const userObj = user ? JSON.parse(user) : null;

      if (!token || !userObj) {
        throw new Error('No user authentication found');
      }

      const response = await fetch('http://localhost:8000/api/auth/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: userObj.id }),
      });

      if (response.ok) {
        // Account deleted successfully
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
      } else {
        const data = await response.json();
        alert('Failed to delete account: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Delete account error:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteAlert(false);
    }
  };

  const cancelDeleteAccount = () => {
    setShowDeleteAlert(false);
  };

  // Get user info from localStorage
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Welcome to Home Page</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleDeleteAccount}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Delete Account
          </button>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {user && (
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3>User Information:</h3>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      <p>This is a protected page. Only authenticated users can access this page.</p>
      <p>If you can see this, you are successfully logged in!</p>

      <AlertBox
        title="Delete Account"
        description="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed."
        type="action"
        status="warning"
        isVisible={showDeleteAlert}
        onConfirm={confirmDeleteAccount}
        onCancel={cancelDeleteAccount}
      />
    </div>
  );
};

export default Home;