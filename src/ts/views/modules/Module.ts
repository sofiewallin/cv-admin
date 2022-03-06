import View from "../View";

import IUser from "../../interfaces/IUser";

/**
 * View.
 * 
 * @author: Sofie Wallin
 */
 export default class Module extends View {
     // Properties
     public module: HTMLElement;

    /**
     * Constructor
     */
    constructor(apiUrl?: string, user?: IUser) {
        super(apiUrl, user);
    }

    /**
     * Return section.
     * 
     * Creates and returns a section element.
     */
    async returnSection(id: string): Promise<HTMLElement> {
        const section = document.createElement('section') as HTMLElement;
        section.id = id;

        return section;
    }

    /**
     * Return heading.
     * 
     * Creates and returns a heading element.
     */
    async returnHeading(hLevel: number, innerHTML: string): Promise<HTMLElement> {
        const heading = document.createElement(`h${hLevel}`) as HTMLHeadingElement;
        heading.innerHTML = innerHTML;

        return heading;
    }
 }
