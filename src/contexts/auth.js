import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import auth from '@react-native-firebase/auth';
import api from '../services/apis'

const AuthContext = createContext({
    signed: false, 
    loginError: false,
    loading: true,
    user: {},
    signIn: () => {}, 
    signOutApp: () => {}
});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@MagiaDoBrincar:user');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
            }
            setLoading(false);
        }

        loadStorageData();
        
    }, []);

    async function signIn(email, password) {
        const responseData = await api.post('/login', {user: email, password});

        if(!responseData) {
            setError(true);
        }
        else{
            setUser(responseData.data.data);
            await AsyncStorage.setItem('@MagiaDoBrincar:user', JSON.stringify(responseData.data.data));
        }

    }

    function signOutApp() {
    //    auth().signOut()
    //         .then(() => {
    //             console.log('signout firebase succefull');
    //         })
    //         .catch((error) => {
    //             console.log('error signout firebase: ', error);
    //         })
            
        
        AsyncStorage.clear()
            .then(() => {
                setUser(null);
                setError(false);
            });
        
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user, 
            loginError: error, 
            loading: loading,
            user, 
            signIn, 
            signOutApp
        }}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}