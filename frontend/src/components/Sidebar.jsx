import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <div style={{
    width: '180px',
    minHeight: '100vh',
    background: '#f0f0f0',
    padding: '30px 0',
    boxSizing: 'border-box'
  }}>
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          color: isActive ? '#1976d2' : '#333',
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none',
          fontSize: '18px',
          padding: '8px 24px',
        })}
        end
      >
        工人列表
      </NavLink>
      <NavLink
        to="/message-board"
        style={({ isActive }) => ({
          color: isActive ? '#1976d2' : '#333',
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none',
          fontSize: '18px',
          padding: '8px 24px',
        })}
      >
        留言板
      </NavLink>
    </nav>
  </div>
);

export default Sidebar; 