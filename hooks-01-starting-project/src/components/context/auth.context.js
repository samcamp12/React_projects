import React ,{ useState }from 'react';

const Authcontext = React.createContext({
    isAuth: false,
    login: () => {}
});

const AuthContextProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const loginHandler = () => {
        setIsAuthenticated(true);
    }
    
    return (
        <Authcontext.Provider
        value={{ login: loginHandler, isAuth: isAuthenticated }}
        >
            {props.children}
        </Authcontext.Provider>
    )
}

export default AuthContextProvider;