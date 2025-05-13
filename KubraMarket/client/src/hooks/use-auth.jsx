import { createContext, useContext, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  // const { data: user } = useQuery({ queryKey: ["/api/user"], queryFn: () => apiRequest("GET", "/api/user")});
  const { data: user } = useQuery({ 
    queryKey: ["/api/user"], 
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/user");
      return await response.json(); // Parse JSON here
    }
  });
  
  const loginMutation = useMutation({
    mutationFn: (credentials) => apiRequest("POST", "/api/login", credentials),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/user"] }),
  });

  const registerMutation = useMutation({
    mutationFn: (userData) => apiRequest("POST", "/api/register", userData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/user"] }),
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/logout"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/user"] }),
  });

  const login = useCallback((credentials) => loginMutation.mutateAsync(credentials), [loginMutation]);
  const register = useCallback((userData) => registerMutation.mutateAsync(userData), [registerMutation]);
  const logout = useCallback(() => logoutMutation.mutateAsync(), [logoutMutation]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


// Helper function - needed from original code


const getQueryFn = ({ on401 = "throw" }) => async (key) => {
  try {
    const res = await apiRequest("GET", key);
    return await res.json();
  } catch (err) {
    if (err.status === 401 && on401 === "throw") {
      throw err;
    }
    if (on401 === "returnNull") {
      return null;
    }
    throw err;
  }
};