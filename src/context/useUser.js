import { UserContext } from "../App";
import { useContext } from "react";

function useUser() {
    return useContext(UserContext)
}

export default useUser