// App
import App from "../../App";

// Auth
import Auth from "../../auth/Auth";

// Interfaces
import IError from "../../interfaces/IError";
import IUser from "../../interfaces/IUser";

/**
 * Logout button module.
 * 
 * @author: Sofie Wallin
 */
export default class LogoutButton {

    // Properties
    private apiUrl: string;
    private user: IUser;
    private module: HTMLButtonElement;

    /**
     * Constructor
     */
    constructor(apiUrl: string, user: IUser) {
        this.apiUrl = apiUrl;
        this.user = user;
    }

    /**
     * Create module.
     */
    async create(): Promise<HTMLButtonElement> {
        // Create button
        const button = document.createElement('button') as HTMLButtonElement;
        button.classList.add('logout-button');
        button.innerText = 'Sign out';

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
