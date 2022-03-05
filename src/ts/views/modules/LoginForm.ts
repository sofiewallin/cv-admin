// Auth
import Auth from "../../auth/Auth";

// Interfaces
import ILoginDetails from "../../interfaces/ILoginDetails";
import IError from "../../interfaces/IError";

/**
 * Login form module.
 * 
 * @author: Sofie Wallin
 */
export default class LoginForm {

    // Properties
    private apiUrl: string;
    private module: HTMLFormElement;

    /**
     * Constructor
     */
    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    /**
     * Create module.
     */
    async create(): Promise<HTMLFormElement> {
        // Create form
        const form = document.createElement('form') as HTMLFormElement;
        form.action = '/';
        form.classList.add('login-form');
        form.innerHTML = `
            <h1>Sign in</h1>
            <div class="form-message error" aria-live="polite"></div>
            <p class="form-field form-text-field">
                <label for="username-input">Username <abbr title="obligatorisk" class="required">*</abbr></label>
                <input type="text" name="username" id="username-input" placeholder="Enter your username">
            </p>
            <p class="form-field form-text-field">
                <label for="password-input">Password <abbr title="obligatorisk" class="required">*</abbr></label>
                <input type="password" name="password" id="password-input" placeholder="Enter your password">
            </p>
            <p class="form-field form-submit-field">
                <button type="submit" class="button button-big">Sign in</button>
            </p>
        `;

        // Set form as module
        this.module = form;

        // Handle submit event on form
        await this.handleSubmit();

        // Return form
        return this.module;
    }

    /**
     * Handle submit event on form.
     */
    async handleSubmit() {
        // Get input fields of form
        const username = this.module.querySelector('#username-input') as HTMLInputElement;
        const password = this.module.querySelector('#password-input') as HTMLInputElement;
        
        // Add event listener
        this.module.addEventListener('submit', e => {
            e.preventDefault();

            // Set login details with value from input fields
            const loginDetails = {
                username: username.value,
                password: password.value
            }

            // Log in user
            this.loginUser(loginDetails);
        });
    }

    /**
     * Log in user after submitting form.
     */
    async loginUser(loginDetails: ILoginDetails): Promise<void>  {
        // Write error message if one or both input fields are empty
        if (loginDetails.username === '' || loginDetails.password === '') {
            await this.writeFormError('You have to enter both a username and a password.');
            return;
        }

        // Log in user
        const auth = new Auth();
        let loginUser = await auth.loginUser(loginDetails, this.apiUrl);

        // Write error message if there is one
        if (loginUser !== undefined) {
            loginUser = loginUser as IError;
            await this.writeFormError(loginUser.error);
        }
    }

    /**
     * Write form error message.
     */
    async writeFormError(message: string) {
        // Get error element, activate it and write message
        const error = document.querySelector('.error') as HTMLElement;
        error.classList.add('is-active');
        error.innerText = message;
    }


}
