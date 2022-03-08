import View from "../View";
import IUser from "../../interfaces/IUser";

/**
 * Module base.
 * 
 * @author: Sofie Wallin
 */
export default class Module extends View {
     public module: HTMLElement;

    constructor(apiUrl?: string, user?: IUser) {
        super(apiUrl, user);
    }

    /**
     * Create section.
     * 
     * Creates and returns a section element.
     */
    async createSection(id: string): Promise<HTMLElement> {
        const section = document.createElement('section') as HTMLElement;
        section.id = id;

        return section;
    }

    /**
     * Create article.
     * 
     * Creates and returns an article element.
     */
    async createArticle(objectType: string): Promise<HTMLElement> {
        const article = document.createElement('article') as HTMLElement;
        article.classList.add(objectType);

        return article;
    }

    /**
     * Create div.
     * 
     * Creates and returns a div element.
     */
    async createDiv(htmlClasses?: string[], id?: string): Promise<HTMLDivElement> {
        const div = document.createElement('div') as HTMLDivElement;
        if (id) div.id = id;
        if (htmlClasses.length > 0) {
            htmlClasses.forEach(htmlClass => {
                div.classList.add(htmlClass);
            });
        }

        return div;
    }

    /**
     * Create heading.
     * 
     * Creates and returns a heading element.
     */
    async createHeading(hLevel: number, innerHTML: string, htmlClasses?: string[]): Promise<HTMLHeadingElement> {
        const heading = document.createElement(`h${hLevel}`) as HTMLHeadingElement;
        heading.innerHTML = innerHTML;
        if (htmlClasses) {
            htmlClasses.forEach(htmlClass => {
                heading.classList.add(htmlClass);
            });
        }

        return heading;
    }

    /**
     * Create paragraph.
     * 
     * Creates and returns a paragraph element.
     */
    async createParagraph(innerHTML: string, htmlClasses?: string[]): Promise<HTMLParagraphElement> {
        const paragraph = document.createElement('p') as HTMLParagraphElement;
        paragraph.innerHTML = innerHTML;
        if (htmlClasses) {
            htmlClasses.forEach(htmlClass => {
                paragraph.classList.add(htmlClass);
            });
        }

        return paragraph;
    }

    /**
     * Create unordered list.
     * 
     * Creates and returns a ul element.
     */
    async createUlList(id: string, listItems: HTMLLIElement[]): Promise<HTMLUListElement> {
        const ul = document.createElement('ul') as HTMLUListElement;
        ul.id = id;
        listItems.forEach(listItem => {
            ul.append(listItem);
        });

        return ul;
    }

    /**
     * Create button.
     * 
     * Creates and returns a button element.
     */
    async createButton(innerHTML: string, isSubmit: boolean, htmlClasses?: string[]): Promise<HTMLButtonElement> {
        const button = document.createElement('button') as HTMLButtonElement;
        button.innerHTML = innerHTML;
        if (isSubmit) button.type = 'submit';
        if (htmlClasses) {
            htmlClasses.forEach(htmlClass => {
                button.classList.add(htmlClass);
            });
        }
        return button;
    }
}
