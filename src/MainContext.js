import React from 'react';

const defaultVal = {
    profile: JSON.parse(localStorage.getItem('profile')),
    loggedIn: false
}
export const MainContext = React.createContext(defaultVal);