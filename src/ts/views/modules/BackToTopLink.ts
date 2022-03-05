/**
 * Back to top link module.
 * 
 * @author: Sofie Wallin
 */
 export default  class BackToTopLink {
    
    // Properties
    public module: HTMLAnchorElement;

    /**
     * Create module.
     */
    async create(): Promise<HTMLAnchorElement> {
        // Create link
        const link = document.createElement('a') as HTMLAnchorElement;
        link.id = 'back-to-top';
        link.href = '#';
        link.innerHTML = '<span class="hidden-visually">Back to top</span>';

        // Set link as module
        this.module = link;

        return this.module;
     }
 }
