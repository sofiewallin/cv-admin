// Interfaces
import IUser from "../../../interfaces/IUser";

/**
 * Projects section module.
 * 
 * @author: Sofie Wallin
 */
export default class ProjectSection {

    // Properties
    public apiUrl: string;
    public user: IUser;
    public module: HTMLElement;

    /**
     * Constructor
     */
     constructor(apiUrl: string, user: IUser) {
        this.apiUrl = apiUrl;
        this.user = user;
    }

    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create section
        const section = document.createElement('section') as HTMLElement;
        section.id = 'projects';

        // Create section heading and add it to section
        const heading = document.createElement('h2') as HTMLHeadingElement;
        heading.innerText = 'Projects';
        section.append(heading);

        // Set form as module
        this.module = section;

        // Return form
        return this.module;
    }
}
