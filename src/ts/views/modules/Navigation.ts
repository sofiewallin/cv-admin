import Module from "./Module";
import IModule from "../../interfaces/IModule";

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
        menu.classList.add('menu', 'hidden');
        menu.innerHTML = `
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#experience">Experience</a></li>
        `;
        this.module.append(menu);

        // Set button to toggle menu
        await this.setVisibilityToggle(toggleMenuButton, menu, 'menu');

        return this.module;
    }
}
