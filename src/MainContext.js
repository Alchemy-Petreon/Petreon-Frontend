import React from 'react';

const defaultVal = {
    profile: {},
    loggedIn: false
}
export const MainContext = React.createContext(defaultVal);