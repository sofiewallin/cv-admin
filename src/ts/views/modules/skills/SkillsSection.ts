import Module from "../Module";
import IModule from "../../../interfaces/IModule";

/**
 * Skills section module.
 * 
 * @author: Sofie Wallin
 */
export default class SkillsSection extends Module implements IModule {
    /**
     * Return module.
     */
    async return(): Promise<HTMLElement> {
        // Create section
        const section = await this.returnSection('skills');
        const heading = await this.returnHeading(2, 'Skills');
        section.append(heading);

        // Set module as section
        this.module = section;

        // Return module
        return this.module;
    }
}
