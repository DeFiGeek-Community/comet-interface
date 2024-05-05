import React from 'react';

interface StatusBarProps {
  progress: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ progress }) => {
  const containerStyles: React.CSSProperties = {
    height: 10,
    width: '100%',
    backgroundColor: "#808080",
    borderRadius: 50,
  };

  const fillerStyles: React.CSSProperties = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: '#4caf50',
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 1s ease-in-out'
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={{ padding: 5, color: 'white', fontWeight: 900 }}>
          {`${progress}%`}
        </span>
      </div>
    </div>
  );
};

export default StatusBar;