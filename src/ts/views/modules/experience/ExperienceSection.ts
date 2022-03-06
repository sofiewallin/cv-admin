import Module from "../Module";
import IModule from "../../../interfaces/IModule";

/**
 * Experience section module.
 * 
 * @author: Sofie Wallin
 */
export default class ExperienceSection extends Module implements IModule {
    /**
     * Return module.
     */
    async return(): Promise<HTMLElement> {
        // Create section
        const section = await this.returnSection('experience');
        const heading = await this.returnHeading(2, 'Experience');
        section.append(heading);

        // Set module as section
        this.module = section;

        // Return module
        return this.module;
    }
}
