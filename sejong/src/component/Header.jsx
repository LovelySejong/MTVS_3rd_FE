import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getUserProfile } from '../api/user';
import { logout } from '../api/auth';

const HeaderBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [nickname, setNickname] = useState(''); // 닉네임 상태 추가

  const navigate = useNavigate();

  // 닉네임을 받아오는 API 호출
  const getProfile = async () => {
    try {
      const response = await getUserProfile();
      if (response?.success && response?.response?.nickname) {
        setNickname(response.response.nickname); // 받아온 닉네임을 상태에 저장
      } else {
        console.error('Invalid profile response:', response);
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  };

  useEffect(() => {
    getProfile(); // 컴포넌트 마운트 시 프로필 정보 불러오기
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

  // 닉네임 클릭 시 드롭다운 토글
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link to="/mypage" style={styles.link}>My Page</Link>
        <Link to="/quiz" style={styles.link}>Quiz</Link>

        {/* 닉네임 및 드롭다운 */}
        <div style={styles.profileContainer}>
          <span style={styles.nickname} onClick={toggleDropdown}>
            {nickname} ▼
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
    backgroundColor: '#f8f9fa',
    padding: '10px 20px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '16px',
  },
  profileContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  nickname: {
    cursor: 'pointer',
    fontSize: '16px',
    color: '#007bff',
  },
  dropdown: {
    position: 'absolute',
    top: '30px',
    right: '0',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1,
  },
  logoutButton: {
    padding: '10px',
    width: '100%',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    color: '#007bff',
    fontSize: '16px',
  },
};

export default HeaderBar;