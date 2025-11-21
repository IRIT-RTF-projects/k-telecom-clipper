import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import type { UserLogin } from '../../types/User';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserLogin>({
    login: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.login.trim() || !formData.password.trim()) {
      setError('Заполните все поля');
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userLogin', formData.login);
      navigate('/domofons');
    } catch (error) {
      console.error('Ошибка:', error);
      setError('Ошибка соединения с сервером');
      setIsLoading(false);
    }
  };

  const handleSkipAuth = () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userLogin', 'guest');
    navigate('/domofons');
  };

  // Вход в админ панель (оставил)
  const handleAdminLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userLogin', 'admin');
    localStorage.setItem('isAdmin', 'true');
    navigate('/admin');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <h1>Авторизация</h1>
          {/* подпись убрана по требованию */}
        </div>
        
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="login">Логин</label>
          <input
            type="text"
            id="login"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
            autoComplete="username"
            disabled={isLoading}
            placeholder="Введите логин"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Пароль</label>
          <div className={styles.passwordInputContainer}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              disabled={isLoading}
              placeholder="Введите пароль"
              className={styles.passwordInput}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={togglePasswordVisibility}
              disabled={isLoading}
              aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? 'Вход...' : 'Войти'}
        </button>

        <div className={styles.skipSection}>
          <button 
            type="button" 
            className={styles.skipButton}
            onClick={handleSkipAuth}
          >
            Продолжить без авторизации ›
          </button>
          <p className={styles.skipNote}>Для демонстрации функционала</p>
        </div>

        <div className={styles.adminSection}>
          <button 
            type="button" 
            className={styles.adminButton}
            onClick={handleAdminLogin}
          >
            Войти в админ панель ›
          </button>
          <p className={styles.adminNote}>Для администраторов системы</p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
