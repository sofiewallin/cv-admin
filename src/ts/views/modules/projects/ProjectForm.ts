import App from "../../../App";
import Form from "../Form";
import IModule from "../../../interfaces/IModule";
import IUser from "../../../interfaces/IUser";
import IProject from "../../../interfaces/IProject";
import IError from "../../../interfaces/IError";
import ProjectArticle from "./ProjectArticle";

/**
 * Project form module.
 * 
 * @author: Sofie Wallin
 */
export default class ProjectForm extends Form implements IModule  {
    protected title: string;
    protected website: string;
    protected description: string;
    protected logo: string;
    protected type: string;

    constructor(
        apiUrl: string, 
        user: IUser, 
        isEditMode: boolean, 
        objectType: string, 
        id?: number, 
        title?: string, 
        website?: string,
        description?: string,
        logo?: string,
        type?: string,
        order?: number
    ) {
        super(apiUrl, user, isEditMode, objectType, id, order);

        this.title = title;
        this.website = website;
        this.description = description;
        this.logo = logo;
        this.type = type;
    }

    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create form and set as module
        let form: HTMLFormElement;
        if (this.isEditMode) {
            form = await this.createForm(['edit-form', 'hidden'], `project-edit-form-${this.id}`);
        } else {
            form = await this.createForm(['add-form']);
            form.classList.add('add-form');
        }
        this.module = form;

        // Create logo container and add to form
        const logoDiv = await this.createDiv(['logo-container']);
        this.module.append(logoDiv);

        // Create logo images figure and add to logo container
        const logoFigure = document.createElement('figure') as HTMLElement;
        logoFigure.classList.add('logo');

        if (this.isEditMode) {
            const baseUrl = this.apiUrl.replace('/api', '');
            const logo = document.createElement('img') as HTMLImageElement;
            logo.alt = `${this.title} logo`;
            logo.src = `${baseUrl}/storage/uploads/${this.logo}`;
            logoFigure.append(logo);
        } else {
            let logoParagraph = await this.createParagraph('Choose a logo');
            logoFigure.append(logoParagraph);
        }
        logoDiv.append(logoFigure);

        // Create input group for logo and add to logo container
        let logoInputId: string;
        let logoInputValue: string;
        
        if (this.isEditMode) {
            logoInputId = `project-logo-${this.id}`;
            logoInputValue = this.logo;
        } else {
            logoInputId = `new-project-logo`;
            logoInputValue = '';
        }
        
        const logoInputGroup = await this.createInputGroup(
            'Logo', // Label
            'file', // Type
            logoInputId, // Id
            true // Will be validated
        );
        logoDiv.append(logoInputGroup);

        // Add sccept attribut and validation to logo input not in edit mode
        const logoInput = logoInputGroup.querySelector('input');
        logoInput.accept = 'image/svg+xml';
        if (!this.isEditMode) {
            await this.validator.addValidationToField(
                logoInput, 'required', 'true', 'A logo is required', 'Logo'
            );
        }

        // Create input group for title and add to form
        let titleInputId: string;
        let titleInputValue: string;
        
        if (this.isEditMode) {
            titleInputId = `project-title-${this.id}`;
            titleInputValue = this.title;
        } else {
            titleInputId = `new-project-title`;
            titleInputValue = '';
        }
        
        const titleInputGroup = await this.createInputGroup(
            'Title', // Label
            'text', // Type
            titleInputId, // Id
            true, // Will be validated
            titleInputValue, // Value
            'Enter a title'
        );
        this.module.append(titleInputGroup);

        // Add validation to title input
        const titleInput = titleInputGroup.querySelector('input');
        await this.validator.addValidationToField(
            titleInput, 'minLength', '2', 'Enter a title with at least 2 characters'
        );
        await this.validator.addValidationToField(
            titleInput, 'maxLength', '64', 'The title can be a maximum of 64 characters'
        );
        await this.validator.addValidationToField(
            titleInput, 'required', 'true', 'A title is required', 'Title'
        );

        // Create input group for website and add to form
        let websiteInputId: string;
        let websiteInputValue: string;
        
        if (this.isEditMode) {
            websiteInputId = `project-website-${this.id}`;
            websiteInputValue = (this.website) ? this.website : '';
        } else {
            websiteInputId = `new-project-website`;
            websiteInputValue = '';
        }
        
        const websiteInputGroup = await this.createInputGroup(
            'Website', // Label
            'url', // Type
            websiteInputId, // Id
            true, // Will be validated
            websiteInputValue, // Value
            'Enter a url' // Placeholder
        );
        this.module.append(websiteInputGroup);

        // Add validation to workplace website input
        const websiteInput = websiteInputGroup.querySelector('input');
        await this.validator.addValidationToField(
            websiteInput, 'maxLength', '255', 'The website can be a maximum of 255 characters'
        );

        // Create select group for type and add to form
        const typeSelectGroup = document.createElement('p') as HTMLParagraphElement;
        typeSelectGroup.classList.add('form-field', 'form-select-field');

        let typeId: string;
        let typeValue: string;

        if (this.isEditMode) {
            typeId = `project-type-${this.id}`;
            typeValue = this.type;
        } else {
            typeId = 'new-project-type';
            typeValue = 'Professional';
        }

        const typeLabel = document.createElement('label') as HTMLLabelElement;
        typeLabel.setAttribute('for', typeId);
        typeLabel.innerText = 'Type';
        typeSelectGroup.append(typeLabel);

        const typeSelect = document.createElement('select') as HTMLSelectElement;
        typeSelect.name = typeId;
        typeSelect.id = typeId;

        const typeOptionProfessional = document.createElement('option') as HTMLOptionElement;
        typeOptionProfessional.value = 'Professional';
        if (typeValue === 'Professional') typeOptionProfessional.selected = true;
        typeOptionProfessional.innerText = 'Professional';
        typeSelect.append(typeOptionProfessional);

        const typeOptionStudent = document.createElement('option') as HTMLOptionElement;
        typeOptionStudent.value = 'Student';
        if (typeValue === 'Student') typeOptionStudent.selected = true;
        typeOptionStudent.innerText = 'Student';
        typeSelect.append(typeOptionStudent);

        const typeOptionPersonal = document.createElement('option') as HTMLOptionElement;
        typeOptionPersonal.value = 'Personal';
        if (typeValue === 'Personal') typeOptionPersonal.selected = true;
        typeOptionPersonal.innerText = 'Personal';
        typeSelect.append(typeOptionPersonal);

        typeSelectGroup.append(typeSelect);
        this.module.append(typeSelectGroup);

        // Create textarea group for description and add to form
        const descriptionTextareaGroup = document.createElement('p') as HTMLParagraphElement;
        descriptionTextareaGroup.classList.add('form-field', 'form-textarea-field');

        let descriptionId: string;
        let descriptionValue: string;

        if (this.isEditMode) {
            descriptionId = `project-description-${this.id}`;
            descriptionValue = this.description;
        } else {
            descriptionId = 'new-project-description';
            descriptionValue = '';
        }
        
        const descriptionLabel = document.createElement('label') as HTMLLabelElement;
        descriptionLabel.setAttribute('for', descriptionId);
        descriptionLabel.innerText = 'Description';
        descriptionTextareaGroup.append(descriptionLabel);

        const descriptionTextarea = document.createElement('textarea') as HTMLTextAreaElement;
        descriptionTextarea.name = descriptionId;
        descriptionTextarea.id = descriptionId;
        descriptionTextarea.value = descriptionValue;
        descriptionTextarea.placeholder = 'Enter a description';
        descriptionTextareaGroup.append(descriptionTextarea);

        this.module.append(descriptionTextareaGroup);

        // Create input group for order and add to form
        const orderInputGroup = await this.createOrderGroup('project');
        const orderInput = orderInputGroup.querySelector('input');
        this.module.append(orderInputGroup);

        // Add event listener for validation on input for all fields
        await this.validator.addInputValidationEventListener([
            titleInput, 
            websiteInput,
            orderInput
        ]);

        // Create buttons group and add to form
        let buttonsGroup: HTMLParagraphElement;
        if (this.isEditMode) {
            buttonsGroup = await this.createButtonsGroup(true);
        } else {
            buttonsGroup = await this.createButtonsGroup(false);
        }
        this.module.append(buttonsGroup);

        // Add event listener to form submit event
        await this.handleSubmit(
            titleInput,
            websiteInput,
            descriptionTextarea,
            logoInput, 
            typeSelect,
            orderInput
        );

        return this.module;
    }

    /**
     * Handle submit.
     * 
     * Adds event listener to form submit event that
     * checks if submit is an edit or an add and calls
     * the right function.
     */
    async handleSubmit(
        titleInput: HTMLInputElement, 
        websiteInput: HTMLInputElement,
        descriptionTextarea: HTMLTextAreaElement,
        logoInput: HTMLInputElement,
        typeSelect: HTMLSelectElement,
        orderInput: HTMLInputElement
    ): Promise<void> {
        // Add event listener to form
        this.module.addEventListener('submit', async e => {
            e.preventDefault();

            // Validate fields
            if (!await this.validator.validateField(titleInput)) return;
            if (!await this.validator.validateField(websiteInput)) return;
            if (!await this.validator.validateField(logoInput)) return;
            if (!await this.validator.validateField(orderInput)) return;

            const project = new FormData();
            project.append('title', titleInput.value);
            project.append('website', websiteInput.value);
            project.append('description', descriptionTextarea.value);
            project.append('logo', logoInput.files[0]);
            project.append('type', typeSelect.value);
            project.append('order', orderInput.value);

            // // Calls update function or create function
            if (this.isEditMode) {
                await this.updateProject(project);
            } else {
                await this.createProject(project);
            }
        });
    }

    /**
     * Create project.
     */
    async createProject(project: any): Promise<void> {
        const app = new App();
        
        // Create work experience in API
        let createdProject = await this.model.create(project);

        // Write error if there is one
        if (createdProject.hasOwnProperty('error')) {
            await app.writeMessage('error', (createdProject as IError).error);
            return;
        }

        // Set values from created work experience
        this.id = (createdProject as IProject).id;
        this.title = (createdProject as IProject).title;
        this.website = (createdProject as IProject).website;
        this.description = (createdProject as IProject).description;
        this.logo = (createdProject as IProject).logo;
        this.type = (createdProject as IProject).type;
        this.order = (createdProject as IProject).order;

        // Add a new work experience to list right before add form
        const list = this.module.parentElement.parentElement;
        const listItem = document.createElement('li') as HTMLLIElement;
        listItem.id = `project-${this.id}`;
        await this.appendModule(
            new ProjectArticle(
                this.apiUrl,
                this.user,
                this.id, 
                this.title, 
                this.website,
                this.description,
                this.logo,
                this.type,
                this.order
            ), listItem
        );

        await this.appendModule(
            new ProjectForm(
                this.apiUrl, 
                this.user, 
                true,
                'Project',
                this.id, 
                this.title,
                this.website,
                this.description,
                this.logo,
                this.type,
                this.order
            ), listItem
        );
        list.insertBefore(listItem, this.module.parentElement);
        
        // Empty fields in form
        const inputFields = this.module.querySelectorAll('input');
        inputFields.forEach(field => {
            field.value = (field.type === 'number') ? '0' : '';
        });

        const textareaField = this.module.querySelector('textarea');
        textareaField.value = '';

        const selectField = this.module.querySelector('select');
        selectField.value = 'Professional';

        // Write success message
        await app.writeMessage('success', `The project was successfully added.`);
    }

    /**
     * Update work experience.
     */
     async updateProject(project: any): Promise<void> {
        const app = new App();

        // Update work experience in API
        let updatedProject = await this.model.update(this.id, project);

        // Write error if there is one
        if (updatedProject.hasOwnProperty('error')) {
            await app.writeMessage('error', (updatedProject as IError).error);
            return;
        }

        // Set values from updated work experience
        this.id = (updatedProject as IProject).id;
        this.title = (updatedProject as IProject).title;
        this.website = (updatedProject as IProject).website;
        this.description = (updatedProject as IProject).description;
        this.logo = (updatedProject as IProject).logo;
        this.type = (updatedProject as IProject).type;
        this.order = (updatedProject as IProject).order;

        // Set new src to images and new values to paragraphs in article
        const projectArticle = this.module.previousElementSibling;

        const baseUrl = this.apiUrl.replace('/api', '');
        const logo = projectArticle.querySelector('img') as HTMLImageElement;
        logo.src = `${baseUrl}/storage/uploads/${this.logo}`;

        const titleParagraph = projectArticle.querySelector('.project-title > p') as HTMLParagraphElement;
        titleParagraph.innerText = this.title;

        const websiteParagraph = projectArticle.querySelector('.project-website > p') as HTMLParagraphElement;
        if (this.website) {
            websiteParagraph.innerHTML = this.website;
        } else {
            websiteParagraph.innerHTML = '<em>Add a website</em>';
        }

        const descriptionParagraph = projectArticle.querySelector('.project-description > p') as HTMLParagraphElement;
        if (this.description) {
            descriptionParagraph.innerHTML = this.description;
        } else {
            descriptionParagraph.innerHTML = '<em>Add a description</em>';
        }

        const typeParagraph = projectArticle.querySelector('.project-type > p') as HTMLParagraphElement;
        typeParagraph.innerText = this.type;

        const orderParagraph = projectArticle.querySelector('.project-order > p') as HTMLParagraphElement;
        orderParagraph.innerText = this.order.toString();

        // Hide form an show article
        this.module.classList.add('hidden');
        projectArticle.classList.remove('hidden');

        // Set aria expanded to false on edit button
        const editButton = projectArticle.querySelector('.edit-button');
        editButton.setAttribute('aria-expanded', 'false');

        // Write success message
        await app.writeMessage('success', `The project was successfully updated.`);
    }
}
