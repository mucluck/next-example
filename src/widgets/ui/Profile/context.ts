import { createContext, useContext } from "react";

type User = {
	user: {
		id: number;
		email: string;
	};
} | null;

export const profile = {};
export const currentUser: User = null;

export const ProfileContext = createContext({
	profile,
	setProfile: () => {},
	isSignIn: false,
	isSignUp: false,
	logOut: () => {},
	handleToggleSignIn: (isSignIn: boolean) => {},
	handleToggleSignUp: (isSignUp: boolean) => {},
	token: "",
	currentUser,
});

ProfileContext.displayName = "ProfileContext";

export const ProfileContextProvider = ProfileContext.Provider;
export const ProfileConsumer = ProfileContext.Consumer;
export const useProfile = () => {
	return useContext(ProfileContext);
};
