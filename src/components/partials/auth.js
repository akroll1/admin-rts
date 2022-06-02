export const isLoggedIn = () => {
    return sessionStorage.getItem('isLoggedIn') == 'true' ? true : false;
}
export const setLoggedIn = () => {
    return sessionStorage.setItem('isLoggedIn', true);
}
export const signOut = async () => (
    sessionStorage.setItem('isLoggedIn', false)
);