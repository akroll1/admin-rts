export const isLoggedIn = () => {
    if(sessionStorage.getItem('isLoggedIn')) return true;
    return false;
}

export const signOut = async () => (
    sessionStorage.setItem('isLoggedIn', false)
);