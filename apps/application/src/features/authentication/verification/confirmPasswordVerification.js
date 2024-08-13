export default function confirmPasswordVerification(password, confirmPassword) {
    if (typeof confirmPassword !== "string") {
        return "invalid input"
    }
    
    if (confirmPassword === "") {
        return "password confirmation is required"
    }

    if (confirmPassword !== password) {
        return "passwords do not match"
    }

    return null
}