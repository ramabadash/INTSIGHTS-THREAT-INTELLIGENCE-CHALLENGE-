import React from 'react';
/* ----- TYPES ----- */
import { Notification } from '../../@types/types';
/* ----- STYLES ----- */
import './Notifications.css';

function Notifications({ notifications }: { notifications: Notification[] }) {
  return (
    <div className='notification-div'>
      {notifications.length ? (
        notifications.map(({ message, type, time }, index) => (
          <p key={index}>
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
