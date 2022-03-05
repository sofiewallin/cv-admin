import IUser from "../interfaces/IUser";
import ILoginDetails from "../interfaces/ILoginDetails";
import IError from "../interfaces/IError";

import App from "../App";

/**
 * Auth controller.
 * 
 * Handles authentication, login and logout.
 * 
 * @author: Sofie Wallin
 */

export default class Auth {

    /**
     * Logs in the user.
     * 
     * Renders one module in the login view, 
     * a login form. 
     */
    async loginUser(loginDetails: ILoginDetails, apiUrl: string): Promise<void|IError> {
        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(loginDetails)
            });
        
            const user = await response.json();
        
            if (!response.ok) {
                throw new Error('The username or password you have entered is invalid.');
            }
            
            // Store user
            localStorage.setItem('user', JSON.stringify(user));

            // Rerender the application
            const app = new App()
            await app.render();

        } catch (error) {
            return { error: error.message };
        }
    }

    async getUser(): Promise<IUser|null> {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            return null;
        }

        return user;
    }

    async logoutUser(apiUrl: string, user: IUser): Promise<void|IError> { 
        try {
            const response = await fetch(`${apiUrl}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
        
            const result = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when logging out. Try again!');
            }

            // Remove user from storage
            localStorage.removeItem('user');

            // Rerender the application
            const app = new App()
            await app.render();
            await app.writeMessage('success', result.message);

        } catch (error) {
            return { error: error.message };
        }
    }
}