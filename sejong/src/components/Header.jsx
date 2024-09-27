import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getUserProfile } from '../api/user';
import { logout } from '../api/auth';

const HeaderBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [nickname, setNickname] = useState(''); 
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const getProfile = async () => {
    try {
      const response = await getUserProfile();
      if (response?.success && response?.response?.nickname) {
        setNickname(response.response.nickname); 
      } else {
        console.error('Invalid profile response:', response);
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  };

  useEffect(() => {
    getProfile(); 
  }, []);

  const handleLogout = async () => {
    try {
      const res = await logout();
      console.log('Logout successful:', res);
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link to="/mypage" style={styles.link}>My Page</Link>
        <Link to="/quiz" style={styles.link}>Quiz</Link>

        <div style={styles.profileContainer} ref={dropdownRef}>
          <span style={styles.nickname} onClick={toggleDropdown}>
            {nickname}
          </span>
          {isDropdownOpen && (
            <div style={styles.dropdown}>
              <button style={styles.logoutButton} onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#2D4E93',
    padding: '15px 0',
    borderBottom: '2px solid #4e5d6c',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0 30px',
  },
  link: {
    textDecoration: 'none',
    color: '#f1f1f1',
    fontSize: '19.2px', // 기존보다 1.2배
    marginRight: '30px',
    fontWeight: '500', // 굵게 해서 더 돋보이게
    padding: '10px 15px',
    transition: 'color 0.3s ease',
  },
  linkHover: {
    color: '#ffffff', // 호버 시 효과를 추가할 수 있음
  },
  profileContainer: {
    position: 'relative',
    display: 'inline-block',
    marginLeft: 'auto',
  },
  nickname: {
    cursor: 'pointer',
    fontSize: '19.2px', // 기존보다 1.2배
    color: '#ffffff',
    padding: '12px 25px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  },
  dropdown: {
    position: 'absolute',
    top: '50px', 
    right: '0',
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
    zIndex: 1,
    width: '100%',
  },
  logoutButton: {
    width: '100%',
    background: '#dc3545',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '19.2px', // 기존보다 1.2배
    padding: '10px 0',
    borderRadius: '4px',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.3s ease',
  },
  logoutButtonHover: {
    backgroundColor: '#c82333',
  },
};

export default HeaderBar;
