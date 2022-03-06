import Module from "./Module";
import IModule from "../../interfaces/IModule";

/**
 * Navigation module.
 * 
 * @author: Sofie Wallin
 */
export default  class Navigation extends Module implements IModule {
    /**
     * Return module.
     */
     async return(): Promise<HTMLElement> {
        // Create navigation
        const navigation = document.createElement('nav') as HTMLElement;
        navigation.id = 'main-navigation';
        navigation.setAttribute('aria-label', 'Main menu');
        navigation.innerHTML = `
            <button id="toggle-menu" aria-controls="main-menu" aria-expanded="false">
                <span class="hidden-visually">Show menu</span>
            </button>
            <ul id="main-menu" class="menu closed">
                <li><a href="#projects">Projects</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#experience">Experience</a></li>
            </ul>
        `;

        // Set navigation as module
        this.module = navigation;

        // Handle click event on toggle button
        await this.handleToggleClick();

        // Return navigation
        return this.module;
    }

    async handleToggleClick() {
        // Get button and menu
        const button = this.module.querySelector('#toggle-menu') as HTMLElement;
        const menu = this.module.querySelector('#main-menu') as HTMLElement;

        // Add event listener
        button.addEventListener('click', e => {
            menu.classList.toggle('closed');
            button.classList.toggle('close');
        
            // Toggle ARIA expanded attribute
            if (button.getAttribute('aria-expanded') === 'false') {
                button.setAttribute('aria-expanded', 'true');
            } else {
                button.setAttribute( 'aria-expanded', 'false');
            }
        
            // Toggle button text
            let hiddenText = button.querySelector('.hidden-visually') as HTMLElement;

            if (hiddenText.innerText === 'Show menu') {
                hiddenText.innerText = 'Hide menu';
            } else {
                hiddenText.innerText = 'Show menu';
            }
        });
    }
}
