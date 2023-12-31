const SESSION_KEY= "kaunet_user_session_key"

export const getSession=()=>{
    const session = localStorage.getItem(SESSION_KEY)
    return session ?  JSON.parse(session) : null
}

export const setSession=(sessionData,token)=>{
    localStorage.setItem(SESSION_KEY, sessionData,token)
}

export const clearSession=()=>{
    localStorage.removeItem(SESSION_KEY)
}