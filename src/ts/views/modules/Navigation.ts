import Auth from "../../Auth";
import App from "../../App";
import Module from "./Module";
import IModule from "../../interfaces/IModule";
import IError from "../../interfaces/IError";

/**
 * Navigation module.
 * 
 * @author: Sofie Wallin
 */
export default  class Navigation extends Module implements IModule {
    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create navigation and set as module
        const navigation = document.createElement('nav') as HTMLElement;
        navigation.id = 'main-navigation';
        navigation.setAttribute('aria-label', 'Main menu');
        this.module = navigation;

        // Create toggle menu button and add to navigation
        const toggleMenuButton = await this.createButton(
            '<span class="hidden-visually">Show menu</span>', 
            false, ['toggle-menu-button']
        );
        this.module.append(toggleMenuButton);

        const menu = document.createElement('ul');
        menu.id = 'main-menu';


        menu.classList.add('menu', 'hidden', 'clear');
        menu.innerHTML = `
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#experience">Experience</a></li>
            <li class="logout-button"><button>Log out</button></li>
        `;
        this.module.append(menu);

        // Set button to toggle menu
        await this.setVisibilityToggle(toggleMenuButton, menu, 'menu');

        await this.handleLogOutClick();

        return this.module;
    }

    /**
     * Handle click of log out button.
     */
     async handleLogOutClick() {
        const button = this.module.querySelector('.logout-button button');
        // Add event listener
        button.addEventListener('click', async e => {
            e.preventDefault();

            // Log out user
            const auth = new Auth();
            let logoutUser = await auth.logOutUser(this.apiUrl, this.user);

            // Write error message if there is one
            if (logoutUser !== undefined) {
                const app = new App();
                await app.writeMessage('error', (logoutUser as IError).error);
            }
        });
    }
}
