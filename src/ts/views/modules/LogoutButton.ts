import Module from "./Module";

import App from "../../App";

import Auth from "../../auth/Auth";

import IError from "../../interfaces/IError";
import IUser from "../../interfaces/IUser";

/**
 * Logout button module.
 * 
 * @author: Sofie Wallin
 */
export default class LogoutButton extends Module {

    /**
     * Constructor
     */
    constructor(apiUrl: string, user: IUser) {
        super(apiUrl, user);
    }

    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create button
        const button = document.createElement('button') as HTMLButtonElement;
        button.id = 'logout-button';
        button.innerText = 'Log out';

        // Set button as module
        this.module = button;

        // Handle click event on button
        await this.handleClick();

        // Return button
        return this.module;
    }

    /**
     * Handle click event of button.
     */
    async handleClick() {
        // Add event listener
        this.module.addEventListener('click', e => {
            e.preventDefault();

            // Log out user
            this.logoutUser();
        });
    }

    /**
     * Log out user after clicking button.
     */
    async logoutUser(): Promise<void>  {
        // Log out user
        const auth = new Auth();
        let logoutUser = await auth.logoutUser(this.apiUrl, this.user);

        // Write error message if there is one
        if (logoutUser !== undefined) {
            logoutUser = logoutUser as IError;
            const app = new App();
            await app.writeMessage('error', logoutUser.error);           
        }
    }
}
