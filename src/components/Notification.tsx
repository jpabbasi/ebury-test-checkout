import React, { useEffect, useState } from 'react';
import '../styles/Notification.css';

interface NotificationProps {
  status: number;
  isVisible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  status,
  isVisible,
  onClose,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div className={`notification-container ${show ? 'show' : ''}`}>
      <div className={`notification ${status === 200 ? 'success' : 'error'}`}>
        {status === 200
          ? 'Compra Aprovada! Verifique seu e-mail'
          : 'Compra Rejeitada! Tente novamente'}
      </div>
    </div>
  );
};

export default Notification;
