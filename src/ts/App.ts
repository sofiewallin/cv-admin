// Auth
import Auth from "./auth/Auth";

// Interfaces
import IUser from "./interfaces/IUser";

// Views
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";

/**
 * Main application file.
 * 
 * @author: Sofie Wallin
 */
export default class App {

    // Properties
    private apiUrl: string;
    private user: IUser;
    private body: HTMLElement;
    private appRoot: HTMLElement;

    /**
     * Constructor
     */
    constructor() {
        this.apiUrl = 'http://127.0.0.1:8000/api';
        this.body = document.querySelector('body') as HTMLElement;
        this.appRoot =  document.querySelector('#app-root') as HTMLElement;
    }

    /**
     * Render application.
     */
    async render(): Promise<void> {
        this.clear();
        
        // Get user
        const auth = new Auth();
        const user = await auth.getUser();

        // Render login view if no user
        if (!user) {
            this.body.classList.add('login');

            const loginView = new LoginView(this.apiUrl, this.appRoot);
            await loginView.render();
            return;
        }

        // Set user
        this.user = user;

        // Render home view
        const homeView = new HomeView(this.user, this.apiUrl, this.appRoot);
        await homeView.render();
    }

    /**
     * Clear application.
     */
    async clear() {
        // Clear the application root element
        this.appRoot.innerHTML = '';
        
        // Remove login class from body
        if (this.body.classList.contains('login')) this.body.classList.remove('login');
        
        // Remove navigation, logout button and back to top link
        const navigation = document.querySelector('#main-navigation');
        const logoutButton = document.querySelector('.logout-button');
        const backToTopLink = document.querySelector('.back-to-top');

        if (navigation) navigation.remove();
        if (logoutButton) logoutButton.remove();
        if (backToTopLink) backToTopLink.remove();
    }

    /**
     * Write message for whole application.
     */
    async writeMessage(type: string, message: string) {
        // Get message element, activate it and write message
        const messageElement = document.querySelector('#message') as HTMLElement;
        messageElement.classList.add(type, 'is-active');
        messageElement.innerText = message;

        // Set a timer and hide message after three seconds
        let timer = null;
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
            messageElement.classList.remove(type, 'is-active');
            messageElement.innerText = '';
        }, 3000);
    }
}
