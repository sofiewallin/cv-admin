import Module from "../Module";
import IModule from "../../../interfaces/IModule";

/**
 * Projects section module.
 * 
 * @author: Sofie Wallin
 */
export default class ProjectsSection extends Module implements IModule {
    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create section
        const section = await this.createSection('projects');
        const heading = await this.createHeading(2, 'Projects');
        section.append(heading);

        // Set section as module
        this.module = section;

        // Return module
        return this.module;
    }
}
