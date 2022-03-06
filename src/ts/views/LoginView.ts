import View from "./View";
import IView from "../interfaces/IView";
import LoginForm from "./modules/LoginForm";

/**
 * Login View.
 * 
 * @author: Sofie Wallin
 */
export default class LoginView extends View implements IView {
    /**
     * Render view.
     */
    async render(): Promise<void> {
        await this.appendModule(new LoginForm(this.apiUrl), this.appContent);
    }
}
