import { createContext, useContext, useReducer } from "react";


const initialState = {
    user: null,
    isAuthenticated: false
}



const AuthContext = createContext()

const FAKE_USER = {
    name: "Ayush",
    email: "ayush@dhawan.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

function reducer(state, action){
    switch(action.type){
        case "login":
            return{
                ...state, user: action.payload, isAuthenticated: true
            }
        case "logout":
            return{
                ...state, user: null, isAuthenticated: false
            }
        default:
             throw new Error("error in auth")
    }
}


function AuthProvider({children}){
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState)
    
function login(email, password){
    if(email === FAKE_USER.email && password === FAKE_USER.password) dispatch({type: "login", payload: FAKE_USER})
}

function logout(){
    dispatch({type: "logout"})
}

 return <AuthContext.Provider value={
    {
        user,
        isAuthenticated,
        login,
        logout
    }
 } > {children}</AuthContext.Provider>
}

function useAuth(){
    const context = useContext(AuthContext)
    if(context === undefined) throw new Error("auth context was used outside authprovider")
    return context;
}

export{AuthProvider, useAuth}