import React from 'react';
import './AlertBox.css';

interface AlertBoxProps {
  title: string;
  description: string;
  type: 'action' | 'info';
  status: 'warning' | 'info';
  onConfirm?: () => void;
  onCancel?: () => void;
  onOk?: () => void;
  isVisible: boolean;
}

const AlertBox: React.FC<AlertBoxProps> = ({
  title,
  description,
  type,
  status,
  onConfirm,
  onCancel,
  onOk,
  isVisible
}) => {
  if (!isVisible) return null;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const handleOk = () => {
    if (onOk) onOk();
  };

  return (
    <div className="alert-overlay">
      <div className={`alert-box ${status}`}>
        <div className="alert-header">
          <h2 className="alert-title">{title}</h2>
        </div>

        <div className="alert-body">
          <p className="alert-description">{description}</p>
        </div>

        <div className="alert-footer">
          {type === 'action' ? (
            <>
              <button
                className="alert-button cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="alert-button confirm-button"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </>
          ) : (
            <button
              className="alert-button ok-button"
              onClick={handleOk}
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertBox;