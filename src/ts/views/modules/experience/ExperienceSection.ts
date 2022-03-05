import Module from "../Module";

import IUser from "../../../interfaces/IUser";

/**
 * Experience section module.
 * 
 * @author: Sofie Wallin
 */
export default class ExperienceSection extends Module {
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
        section.id = 'experience';

        // Create section heading and add it to section
        const heading = document.createElement('h2') as HTMLHeadingElement;
        heading.innerText = 'Experience';
        section.append(heading);

        // Set form as module
        this.module = section;

        // Return form
        return this.module;
    }
}
