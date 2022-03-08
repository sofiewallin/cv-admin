import Module from "./Module";
import IUser from "../../interfaces/IUser";

/**
 * Article base.
 * 
 * @author: Sofie Wallin
 */
export default class Article extends Module {
    readonly id: number;

    constructor(apiUrl: string, user: IUser, id?: number) {
        super(apiUrl, user);

        this.id = id;
    }
    /**
     * Create a property group.
     * 
     * Creates and returns a label title and paragraph with information
     * about a property on an object
     */
     async createPropertyInfo(title: string, value: string, htmlClasses: string[]): Promise<HTMLElement> {
        // Create container
        const div = await this.createDiv(htmlClasses);

        // Create heading
        const heading = await this.createHeading(4, title, ['label-title']);
        div.append(heading);

        // Create paragraph
        const p = await this.createParagraph(value.toString());
        div.append(p);

        return div;
    }

    /**
     * Handle click event of edit button.
     */
    async handleEditClick(button: HTMLButtonElement): Promise<void> {
        // Add event listener
        button.addEventListener('click', e => {
            e.preventDefault();

            // Hide article
            this.module.classList.add('hidden');

            // Show any other article that is currently hidden
            const allArticles = document.querySelectorAll('article');
            allArticles.forEach(article => {
                if (article !== this.module && article.classList.contains('hidden')) {
                    article.classList.remove('hidden');

                    // Set aria expanded to false on edit button
                    const editButton = article.querySelector('.edit-button');
                    editButton.setAttribute('aria-expanded', 'false');
                }
            });

            // Set aria expanded to true on edit button
            button.setAttribute('aria-expanded', 'true');

            // Show form
            const editForm = this.module.nextElementSibling;
            editForm.classList.remove('hidden');

            // Hide any other form that is showing
            const allEditForms = document.querySelectorAll('.edit-form');
            allEditForms.forEach(form => {
                if (form !== editForm) {
                    form.classList.add('hidden');
                }
            });   
        });
    }
}
