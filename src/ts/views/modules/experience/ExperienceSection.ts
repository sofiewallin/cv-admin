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
        // Create section
        const section = await this.createSection('experience');
        const heading = await this.createHeading(2, 'Experience');
        section.append(heading);

        // Set section as module
        this.module = section;

        // Return module
        return this.module;
    }
}
