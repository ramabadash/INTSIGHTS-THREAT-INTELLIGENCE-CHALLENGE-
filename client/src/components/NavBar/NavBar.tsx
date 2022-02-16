import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
/* ----- IMAGES ----- */
import logo from '../../images/iceberg.png'; // This is a hack to make the image import work
/* ----- COMPONENT ----- */
import Notifications from './Notifications';
/* ----- TYPES ----- */
import { Notification } from '../../@types/types';
/* ----- STYLE ----- */
import './NavBar.css';

interface Props {
  notifications: Notification[];
}

function NavBar({ notifications }: Props) {
  /* ----- STATES ----- */
  const [unreadNotification, setUnreadNotification] = useState<number>(notifications.length);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [lastNotificationAmount, setLastNotificationAmount] = useState<number>(
    notifications.length
  );

  /* ----- EFFECT ----- */
  useEffect(() => {
    setUnreadNotification(notifications.length - lastNotificationAmount);
    setLastNotificationAmount(notifications.length);
  }, [notifications]);

  /* ----- REFS ----- */
  const activeRef = useRef<React.LegacyRef<HTMLLIElement> | undefined>(undefined);

  /* ----- FUNCTIONS ----- */
  // Navigate
  const navigate = useNavigate();
  // Handle navbar click
  const handleClick = (whereTo: string) => {
    navigate(whereTo);
  };

  const handleNotificationClick = () => {
    setUnreadNotification(0); // Set unread notification to 0
    setShowNotifications(!showNotifications); // Set showNotifications to false
  };

  return (
    <div>
      {/* Horizontal */}
      <ul className='navbar-horizontal'>
        <li>
          <img alt='logo' className='logo' src={logo} />
        </li>
        <li id='notification-nav' onClick={handleNotificationClick}>
          <i className='fa-solid fa-bell'></i>
          {'  '}
          <span className='notification-num'>{unreadNotification}</span>
        </li>
      </ul>

      {/* Notifications */}
      {showNotifications ? <Notifications notifications={notifications} /> : ''}

      {/* Vertical */}
      <ul className='navbar'>
        <li onClick={() => handleClick('/')}>
          <i className='fa-solid fa-house'></i> Home
        </li>
        <li onClick={() => handleClick('/pastes')}>
          <i className='fa-solid fa-file'></i> Pastes
        </li>
        <li onClick={() => handleClick('/analytics')}>
          <i className='fa-solid fa-chart-pie'></i> Analytics
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
