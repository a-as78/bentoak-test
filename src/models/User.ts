export interface User {
  username: string;
  password: string;
}
export interface SignupProps {
  onAuthenticated: (authenticated: boolean) => void;
}