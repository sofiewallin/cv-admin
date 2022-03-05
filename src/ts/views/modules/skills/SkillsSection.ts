import Module from "../Module";

import IUser from "../../../interfaces/IUser";

import ProfessionalSkillsSection from "./sections/ProfessionalSkillsSection";

/**
 * Skills section module.
 * 
 * @author: Sofie Wallin
 */
export default class SkillsSection extends Module {
    /**
     * Constructor
     */
     constructor(apiUrl: string, user: IUser) {
        super(apiUrl, user);
    }

    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create section
        const section = document.createElement('section') as HTMLElement;
        section.id = 'skills';

        // Create section heading and add it to section
        const heading = document.createElement('h2') as HTMLHeadingElement;
        heading.innerText = 'Skills';
        section.append(heading);

        // Set form as module
        this.module = section;

        await super.appendModule(new ProfessionalSkillsSection(this.apiUrl, this.user), this.module);

        // Return form
        return this.module;
    }
}
