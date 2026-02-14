import React from 'react'
import { useAuth } from "../../config/AuthContext";

const Unauthorize = ({children}) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  return children;
}

export default Unauthorize