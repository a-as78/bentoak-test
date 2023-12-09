import { User } from '../models/User';

const AuthService = {
  register: (newUser: User): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const userExists = users.some((user: User) => user.username === newUser.username);
    if (userExists) {
      return false; // Indicate that registration failed due to existing user
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return true; // Indicate successful registration
  },

  login: (loginUser: User): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((user: User) => user.username === loginUser.username && user.password === loginUser.password);
    
    if (userExists) {
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  },

  logout: (): void => {
    localStorage.removeItem('isLoggedIn');
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem('isLoggedIn') === 'true';
  },

  getCurrentUser: (): User | null => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  },
};

export default AuthService;
