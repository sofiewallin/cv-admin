import Module from "../Module";
import IModule from "../../../interfaces/IModule";

/**
 * Experience section module.
 * 
 * @author: Sofie Wallin
 */
export default class ExperienceSection extends Module implements IModule {
    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create section and set as module
        const section = await this.createSection('experience');
        this.module = section;

        // Create section heading and add to section
        const heading = await this.createHeading(2, 'Experience <span class="hidden-visually">Show experiences</span>');
        this.module.append(heading);

        // Create experiences container and add to section
        const experiencesDiv = await this.createDiv(['hidden'], 'skills-container');
        this.module.append(experiencesDiv);

        // Set heading to toggle experiences list
        await this.setVisibilityToggle(heading, experiencesDiv, 'experiences');

        return this.module;
    }
}
