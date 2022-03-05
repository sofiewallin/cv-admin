// Modules
import LoginForm from "./modules/LoginForm";

/**
 * Login View.
 * 
 * @author: Sofie Wallin
 */
export default class LoginView {

    // Properties
    public apiUrl: string;
    public appRoot: HTMLElement;

    /**
     * Constructor
     */
    constructor(apiUrl: string, appRoot: HTMLElement) {
        this.apiUrl = apiUrl;
        this.appRoot = appRoot;
    }

    /**
     * Render view.
     */
    async render(): Promise<void> {
        // Create login form module and add it to application root
        const loginForm = new LoginForm(this.apiUrl);
        const createdLoginForm = await loginForm.create();
        this.appRoot.append(createdLoginForm);
    }

}