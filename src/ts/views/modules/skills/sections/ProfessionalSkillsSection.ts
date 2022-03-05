import Module from "../../Module";

import ISkill from "../../../../interfaces/ISkill";
import IUser from "../../../../interfaces/IUser";

import Skill from "../../../../models/Skill";

/**
 * Professional skills section module.
 * 
 * @author: Sofie Wallin
 */
export default class ProfessionalSkillsSection extends Module {
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
        section.id = 'professional-skills';

        // Create section heading and add it to section
        const heading = document.createElement('h3') as HTMLHeadingElement;
        heading.innerText = 'Professional';
        section.append(heading);

        // Set form as module
        this.module = section;

        // Return form
        return this.module;
    }
}
