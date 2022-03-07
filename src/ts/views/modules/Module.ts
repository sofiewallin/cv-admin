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
     * Return article.
     * 
     * Creates and returns an article element.
     */
     async returnArticle(objectType: string): Promise<HTMLElement> {
        const article = document.createElement('article') as HTMLElement;
        article.classList.add(objectType);

        return article;
    }

    /**
     * Return div.
     * 
     * Creates and returns a div element.
     */
     async returnDiv(htmlClasses?: string[]): Promise<HTMLDivElement> {
        const div = document.createElement('div') as HTMLDivElement;
        if (htmlClasses.length > 0) {
            htmlClasses.forEach(htmlClass => {
                div.classList.add(htmlClass);
            });
        }

        return div;
    }

    /**
     * Return heading.
     * 
     * Creates and returns a heading element.
     */
    async returnHeading(hLevel: number, innerHTML: string, htmlClasses?: string[]): Promise<HTMLHeadingElement> {
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
     * Return paragraph.
     * 
     * Creates and returns a paragraph element.
     */
    async returnParagraph(innerHTML: string, htmlClasses?: string[]): Promise<HTMLParagraphElement> {
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
     * Return unordered list.
     * 
     * Creates and returns a ul element.
     */
     async returnUlList(id: string, listItems: HTMLLIElement[]): Promise<HTMLUListElement> {
        const ul = document.createElement('ul') as HTMLUListElement;
        ul.id = id;
        listItems.forEach(listItem => {
            ul.append(listItem);
        });

        return ul;
    }

    /**
     * Return button.
     * 
     * Creates and returns a button element.
     */
     async returnButton(innerHTML: string, isSubmit: boolean, isDisabled: boolean, htmlClasses?: string[]): Promise<HTMLButtonElement> {
        const button = document.createElement('button') as HTMLButtonElement;
        button.innerHTML = innerHTML;
        if (htmlClasses) {
            htmlClasses.forEach(htmlClass => {
                button.classList.add(htmlClass);
            });
        }
        if (isSubmit) button.type = 'submit';
        if (isDisabled) button.disabled = true;
        return button;
    }
 }
