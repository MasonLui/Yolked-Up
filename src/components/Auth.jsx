import { login, logout, loggedInUserDisplayName } from "../services/authService";

export function SignIn() {
  return <button className="m-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background shadow-md transition-all duration-200" onClick={login}>Sign In</button>;
}

export function SignOut() {
  return (
    <div className="justify-self-end m-8">
      Hello, {loggedInUserDisplayName()}  
      <button className="m-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background shadow-md transition-all duration-200" onClick={logout}>Sign Out</button>
    </div>
  );
}
