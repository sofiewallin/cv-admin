import Module from "../Module";
import IModule from "../../../interfaces/IModule";

/**
 * Projects section module.
 * 
 * @author: Sofie Wallin
 */
export default class ProjectsSection extends Module implements IModule {
    /**
     * Return module.
     */
    async return(): Promise<HTMLElement> {
        // Create section
        const section = await this.returnSection('projects');
        const heading = await this.returnHeading(2, 'Projects');
        section.append(heading);

        // Set module as section
        this.module = section;

        // Return module
        return this.module;
    }
}
