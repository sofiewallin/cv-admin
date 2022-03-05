import View from "./View";

import LoginForm from "./modules/LoginForm";

/**
 * Login View.
 * 
 * @author: Sofie Wallin
 */
export default class LoginView extends View {
    /**
     * Render view.
     */
    async render(): Promise<void> {
        await this.appendModule(new LoginForm(this.apiUrl), this.appRoot);
    }
}
