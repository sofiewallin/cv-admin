
import Auth from "../../Auth";
import Module from "./Module";
import IModule from "../../interfaces/IModule";
import ILoginDetails from "../../interfaces/ILoginDetails";
import IError from "../../interfaces/IError";

/**
 * Login form module.
 * 
 * @author: Sofie Wallin
 */
export default class LoginForm extends Module implements IModule {
    /**
     * Constructor
     */
    constructor(apiUrl: string) {
        super(apiUrl);
    }

    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create form and set as module
        const form = await this.createForm(['login-form']);
        this.module = form;

        // Create form heading and add to form
        const heading = await this.createHeading(1, 'Log in');
        this.module.append(heading);

        // Create form message container and add to form
        const formMessage = await this.createDiv(['form-message', 'error']);
        formMessage.setAttribute('aria-live', 'polite');
        this.module.append(formMessage);

        // Create input group for username and add to form
        const usernameInputGroup = await this.createInputGroup('Username', 'text', 'Enter your username');
        this.module.append(usernameInputGroup);

        // Create input group for password and add to form
        const passwordInputGroup = await this.createInputGroup('Password', 'password', 'Enter your password');
        this.module.append(passwordInputGroup);

        // Create button group and add to form
        const pSubmit = await this.createParagraph('', ['form-field', 'form-submit-field']);
        const button = await this.createButton('Log in', true, ['button']);
        pSubmit.append(button);

        this.module.append(pSubmit);

        // Handle submit event on form
        await this.handleSubmit();

        // Return form
        return this.module;
    }

    /**
     * Create an input field.
     * 
     * Creates and returns a paragraph with a label
     * and an input field of given type.
     */
     async createInputGroup(fieldLabel: string, fieldType: string, fieldPlaceholder: string): Promise<HTMLParagraphElement> {
        // Create paragraph container
        const pContainer = await this.createParagraph('', ['form-field', `form-text-field`]);

        // Create label and add to paragraph
        const label = document.createElement('label') as HTMLLabelElement;
        label.setAttribute('for', fieldLabel.toLowerCase()); 
        label.innerText = fieldLabel;    

        pContainer.append(label);

        // Create input element and add to paragraph
        const input = document.createElement('input') as HTMLInputElement;
        input.type = fieldType;
        input.name = fieldLabel.toLowerCase();
        input.id = fieldLabel.toLowerCase();
        input.placeholder = fieldPlaceholder;

        pContainer.append(input);

        return pContainer;
    }

    /**
     * Handle submit event on form.
     */
    async handleSubmit() {
        // Get input fields of form
        const username = this.module.querySelector('#username') as HTMLInputElement;
        const password = this.module.querySelector('#password') as HTMLInputElement;
        
        // Add event listener
        this.module.addEventListener('submit', async e => {
            e.preventDefault();

            // Set login details with value from input fields
            const loginDetails = {
                username: username.value,
                password: password.value
            }

            // Log in user
            await this.loginUser(loginDetails);
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
            await this.writeFormError((loginUser as IError).error);
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
