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
        // Create section and set as module
        const section = await this.createSection('projects');
        this.module = section;

        // Create section heading and add to section
        const heading = await this.createHeading(2, 'Projects <span class="hidden-visually">Show projects</span>');
        this.module.append(heading);

        // Create projects container and add to section
        const projectsDiv = await this.createDiv(['hidden'], 'skills-container');
        this.module.append(projectsDiv);

        // Set heading to toggle projects list
        await this.setVisibilityToggle(heading, projectsDiv, 'projects');

        return this.module;
    }
}
