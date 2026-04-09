import { createContext, useContext, useState } from "react";
import type { UserApiDto } from "../services/userService";

type AuthContextType = {
    isAuthenticated: boolean;
    currentUser:     UserApiDto | null;
    login:           (user: UserApiDto) => void;
    logout:          () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser]         = useState<UserApiDto | null>(null);

    const login  = (user: UserApiDto) => { setCurrentUser(user); setIsAuthenticated(true); };
    const logout = ()                  => { setCurrentUser(null); setIsAuthenticated(false); };

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
