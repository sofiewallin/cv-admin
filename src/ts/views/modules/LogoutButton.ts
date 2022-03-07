import Auth from "../../auth/Auth";
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
     * Return module.
     */
    async return(): Promise<HTMLElement> {
        // Create button
        const button = await this.returnButton('Log out', false, false, ['logout-button']);
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
        this.module.addEventListener('click', async e => {
            e.preventDefault();

            // Log out user
            const auth = new Auth();
            let logoutUser = await auth.logoutUser(this.apiUrl, this.user);

            // Write error message if there is one
            if (logoutUser !== undefined) {
                logoutUser = logoutUser as IError;
                const app = new App();
                await app.writeMessage('error', logoutUser.error);           
            }
        });
    }
}
