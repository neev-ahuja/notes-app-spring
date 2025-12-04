import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import client from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('jwt_token');
        if (token) {
            (async () => {
                const response = await client.get('/user');
                console.log(user)
                setUser(response.data);
                setLoading(false);
            })();
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await client.post('/login', { username, password });
            const data = response.data;

            if (data === 'FAILED TO LOGIN UserDetailsService returned null, which is an interface contract violation') {
                return false;
            }

            if (data) {
                Cookies.set('jwt_token', data, { expires: 7 });
                setUser({ username });
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (name, username, password) => {
        try {
            const response = await client.post('/register', { name, username, password });
            if (response.data === 'ERROR: Username already exists') {
                throw new Error('Username already exists');
            }
            return true;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logout = () => {
        Cookies.remove('jwt_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
