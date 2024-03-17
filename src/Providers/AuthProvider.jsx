import { app } from "../firabase/firebase.config";
import { getAuth } from "firebase/auth";
import { createContext } from "react";

const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const authInfo = {};
	return (
		<AuthContext.Provider value={authInfo}>
            {children}
            </AuthContext.Provider>
	);
};

export default AuthProvider;
