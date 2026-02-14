import { createContext, useContext, useEffect, useState } from "react";
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  getCurrentUser,
  fetchAuthSession,
  deleteUser
} from "aws-amplify/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check logged in user on app start
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email, password) => {
    return await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
        },
      },
    });
  };

  const handleConfirmSignUp = async (email, code) => {
    return await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
  };

  const handleSignIn = async (email, password) => {
    const response = await signIn({
      username: email,
      password,
    });

    const currentUser = await getCurrentUser();
    setUser(currentUser);

    return response;
  };

  const handleLogout = async () => {
    await signOut();
    setUser(null);
  };

  const getToken = async () => {
    const session = await fetchAuthSession();
    return session.tokens?.idToken?.toString();
  };

  const handleDeleteUser = async()=>{
    await deleteUser();
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp: handleSignUp,
        confirmSignUp: handleConfirmSignUp,
        signIn: handleSignIn,
        logout: handleLogout,
        deleteUser: handleDeleteUser,
        getToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
