// frontend/src/components/PatientSidebar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Calendar, FileText, Heart, LogOut, Menu } from 'lucide-react';
import '../index.css';
import api from '../services/api';
import getImageSrc from '../assets/ImageProfile';

const PatientSidebar = ({ patient }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.getNotificationsForUser();
      setNotifications(response.data.filter(n=>!n.read));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.markNotificationAsRead(id);
      const updatedNotifications = notifications.map(n =>
        n._id === id ? { ...n, read: true } : n
      );
      setNotifications(updatedNotifications);
      fetchNotifications(); // Re-fetch to update the count
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      await markAsRead(notification._id);
    }
    if (notification.link) {
      navigate(notification.link);
    }
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: <Heart size={20} />, label: 'Health Parameters', path: '/patient-dashboard' },
   
    { icon: <Calendar size={20} />, label: 'Appointments', path: '/patient/appointments' },
    { icon: <FileText size={20} />, label: 'Profil', path: '/patient/health-history' },
  ];

  return (
    <>
      <button
        className="fixed top-4 left-0 z-50 bg-gray-800 text-white p-3 rounded-lg"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>
      <div className={`fixed left-0 top-18 h-screen bg-gray-800 text-white transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ width: '16rem' }}>
        <div className="p-4">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img
                src={getImageSrc(patient?.user?.profilePicture)}
                alt={patient?.user?.firstName || 'Profile'}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-semibold">{patient?.user?.firstName[0].toUpperCase() + patient?.user?.firstName.slice(1)} {patient?.user?.lastName[0].toUpperCase()+ patient?.user?.lastName.slice(1)}</h2>
              <p className="text-gray-400 text-sm">Patient</p>
            </div>
          </div>

          <div className="mb-6">
               <div className="flex items-center justify-between px-4 py-3 bg-gray-700 rounded-lg">
                 <div className="flex items-center space-x-2">
                   <Bell size={20} />
                   <span className="font-medium">Notifications</span>
                 </div>
                 <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                  {notifications.filter(n => !n.isRead).length}
                </span>
         </div>
        <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                onClick={() => handleNotificationClick(notification)}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-700 rounded-lg transition-colors ${
                  notification.isRead ? 'opacity-70' : 'bg-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">{notification.message}</span>
                    <span className="block text-xs text-gray-400">
                      {new Date(notification.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {notification.link ? 'Click to view' : ''}
                  </span>
                    </div>
                  </div>
                ))}
                </div>
          </div>

          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-auto p-4">
            <button
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
              className="w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientSidebar;