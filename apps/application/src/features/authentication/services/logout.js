export default function logout(user, setUser) {
    setUser({...user, isAuth: false})
    const tempTheme = localStorage.getItem("theme")
    localStorage.clear();
    localStorage.setItem("theme", tempTheme)
}