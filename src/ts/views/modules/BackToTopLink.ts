import Module from "./Module";
import IModule from "../../interfaces/IModule";

/**
 * Back to top link module.
 * 
 * Creates and returns back to top link element.
 * 
 * @author: Sofie Wallin
 */
export default  class BackToTopLink extends Module implements IModule {
    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create anchor link
        const link = document.createElement('a') as HTMLAnchorElement;
        link.id = 'back-to-top';
        link.href = '#';
        link.innerHTML = '<span class="hidden-visually">Back to top</span>';

        // Set anchor link as module
        this.module = link;

        return this.module;
     }
 }
