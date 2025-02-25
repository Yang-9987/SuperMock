import {UserResource, UseUserReturn} from "@clerk/types";

export const  USER_ID_KEY = "user_id";

// Set the user to local storage
export function setUserToLocalStorage(user: UserResource) {
    let user_id = user.id;
    localStorage.setItem(USER_ID_KEY, user_id);
}

// Remove the user from local storage
export function removeUserFromLocalStorage() {
    localStorage.removeItem(USER_ID_KEY);
}
