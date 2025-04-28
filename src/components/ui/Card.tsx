import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div
      className={`
        rounded-lg overflow-hidden 
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
        border shadow-sm 
        ${hoverable ? 'transition-all duration-200 hover:shadow-md transform hover:-translate-y-1' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;