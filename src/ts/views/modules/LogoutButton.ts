import Auth from "../../Auth";
import App from "../../App";
import Module from "./Module";
import IModule from "../../interfaces/IModule";
import IError from "../../interfaces/IError";

/**
 * Logout button module.
 * 
 * @author: Sofie Wallin
 */
export default class LogoutButton extends Module implements IModule {
    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create button
        const button = await this.createButton('Log out', false, ['logout-button']);

        // Set button as module
        this.module = button;

        // Handle click event on button
        await this.handleClick();

        return this.module;
    }

    /**
     * Handle click event of button.
     */
    async handleClick() {
        // Add event listener
        this.module.addEventListener('click', async e => {
            e.preventDefault();

            // Log out user
            const auth = new Auth();
            let logoutUser = await auth.logoutUser(this.apiUrl, this.user);

            // Write error message if there is one
            if (logoutUser !== undefined) {
                const app = new App();
                await app.writeMessage('error', (logoutUser as IError).error);
            }
        });
    }
}
