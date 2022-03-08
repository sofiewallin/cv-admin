import View from "./View";
import IView from "../interfaces/IView";
import LoginForm from "./modules/LoginForm";

/**
 * Login View.
 * 
 * Renders login view.
 * 
 * @author: Sofie Wallin
 */
export default class LoginView extends View implements IView {
    /**
     * Render view.
     * 
     * Adds login form module in app content 
     * container
     */
    async render(): Promise<void> {
        await this.appendModule(new LoginForm(this.apiUrl), this.appContent);
    }
}
