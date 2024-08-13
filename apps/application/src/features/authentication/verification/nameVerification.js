export default  function nameVerification(name) {
    if (typeof name !== "string") {
        return "invalid input"
    }

    if (name === "") {
        return "name is required"
    }

    return null;
}