import Module from "./Module";

export default class Article extends Module {
    /**
     * Return a property group.
     * 
     * Creates and returns a label title and paragraph with information
     * about a property on an object
     */
     async returnPropertyInfo(title: string, value: string, htmlClasses: string[]): Promise<HTMLElement> {
        const div = await this.returnDiv(htmlClasses);
        const heading = await this.returnHeading(4, title, ['label-title']);
        div.append(heading);
        const p = await this.returnParagraph(value.toString());
        div.append(p);

        return div;
    }

    /**
     * Handle click event of button.
     */
     async handleEditClick(button: HTMLButtonElement): Promise<void> {
        // Add event listener
        button.addEventListener('click', e => {
            e.preventDefault();

            this.module.classList.add('hidden');
            const allArticles = document.querySelectorAll('article');
            allArticles.forEach(article => {
                if (article !== this.module && article.classList.contains('hidden')) {
                    article.classList.remove('hidden');
                }
            });

            const editForm = this.module.nextElementSibling
            editForm.classList.remove('hidden');

            const allEditForms = document.querySelectorAll('.edit-form');
            allEditForms.forEach(form => {
                if (form !== editForm) {
                    form.classList.add('hidden');
                }
            });
            
        });
    }
}