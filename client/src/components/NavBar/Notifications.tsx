import React from 'react';
import { useNavigate } from 'react-router-dom';
/* ----- TYPES ----- */
import { Notification } from '../../@types/types';
/* ----- STYLES ----- */
import './Notifications.css';
/* ----- TYPES ----- */
interface Props {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  setShowNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}

function Notifications({ notifications, setNotifications, setShowNotifications }: Props) {
  /* ----- FUNCTIONS ----- */
  // Navigate
  const navigate = useNavigate();

  //
  const handleDelete = () => {
    setNotifications([]);
  };

  // Handle notification click
  const handleNotificationClick = (type: string) => {
    if (type === 'success') {
      navigate('/pastes');
      setShowNotifications(false);
    }
  };

  return (
    <div className='notification-div'>
      <span className='clear-btn' onClick={handleDelete}>
        <i className='fa-solid fa-trash-can'></i> clear all pastes
      </span>
      {notifications.length ? (
        notifications.map(({ message, type, time }, index) => (
          <p key={index} onClick={() => handleNotificationClick(type)}>
            <span className='notyf-type'>
              {type === 'success' ? (
                <i className='fa-solid fa-circle-check'></i>
              ) : (
                <i className='fa-solid fa-circle-exclamation'></i>
              )}
            </span>
            <span>{message}</span>
            <span className='notyf-time'>
              <i className='fa-solid fa-clock'></i> {time}
            </span>
          </p>
        ))
      ) : (
        <p>You don't have any notifications</p>
      )}
    </div>
  );
}

export default Notifications;
