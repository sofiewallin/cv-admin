import App from "../../../App";
import Form from "../Form";
import IModule from "../../../interfaces/IModule";
import IUser from "../../../interfaces/IUser";
import IWorkExperience from "../../../interfaces/work-experience/IWorkExperience";
import IWorkExperienceFillable from "../../../interfaces/work-experience/IWorkExperienceFillable";
import IError from "../../../interfaces/IError";
import WorkExperienceArticle from "./WorkExperienceArticle";

/**
 * Work experience form module.
 * 
 * @author: Sofie Wallin
 */
export default class WorkExperienceForm extends Form implements IModule  {
    protected role: string;
    protected workplace: string;
    protected workplaceWebsite: string;
    protected startDate: string;
    protected endDate: string;

    constructor(
        apiUrl: string, 
        user: IUser, 
        isEditMode: boolean, 
        objectType: string, 
        id?: number, 
        role?: string, 
        workplace?: string,
        workplaceWebsite?: string,
        startDate?: string,
        endDate?: string,
        order?: number
    ) {
        super(apiUrl, user, isEditMode, objectType, id, order);

        this.role = role;
        this.workplace = workplace;
        this.workplaceWebsite = workplaceWebsite;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create form and set as module
        let form: HTMLFormElement;
        if (this.isEditMode) {
            form = await this.createForm(['edit-form', 'hidden'], `work-experience-edit-form-${this.id}`);
        } else {
            form = await this.createForm(['add-form']);
            form.classList.add('add-form');
        }
        this.module = form;

        // Create input group for role and add to form
        let roleInputId: string;
        let roleInputValue: string;
        
        if (this.isEditMode) {
            roleInputId = `work-experience-role-${this.id}`;
            roleInputValue = this.role;
        } else {
            roleInputId = `new-work-experience-role`;
            roleInputValue = '';
        }
        
        const roleInputGroup = await this.createInputGroup(
            'Role', // Label
            'text', // Type
            roleInputId, // Id
            true, // Will be validated
            roleInputValue, // Value
            'Enter a role'
        );
        this.module.append(roleInputGroup);

        // Add validation to role input
        const roleInput = roleInputGroup.querySelector('input');
        await this.validator.addValidationToField(
            roleInput, 'minLength', '2', 'Enter a role with at least 2 characters'
        );
        await this.validator.addValidationToField(
            roleInput, 'maxLength', '64', 'The role can be a maximum of 64 characters'
        );
        await this.validator.addValidationToField(
            roleInput, 'required', 'true', 'A role is required', 'Role'
        );

        // Create input group for workplace and add to form
        let workplaceInputId: string;
        let workplaceInputValue: string;
        
        if (this.isEditMode) {
            workplaceInputId = `work-experience-workplace-${this.id}`;
            workplaceInputValue = (this.workplace) ? this.workplace : '';
        } else {
            workplaceInputId = `new-work-experience-workplace`;
            workplaceInputValue = '';
        }
        
        const workplaceInputGroup = await this.createInputGroup(
            'Workplace', // Label
            'text', // Type
            workplaceInputId, // Id
            true, // Will be validated
            workplaceInputValue, // Value
            'Enter a workplace' // Placeholder
        );
        this.module.append(workplaceInputGroup);

        // Add validation to workplace input
        const workplaceInput = workplaceInputGroup.querySelector('input');
        await this.validator.addValidationToField(
            workplaceInput, 'maxLength', '64', 'The workplace can be a maximum of 64 characters'
        );

        // Create input group for workplace website and add to form
        let workplaceWebsiteInputId: string;
        let workplaceWebsiteInputValue: string;
        
        if (this.isEditMode) {
            workplaceWebsiteInputId = `work-experience-workplace-website-${this.id}`;
            workplaceWebsiteInputValue = (this.workplaceWebsite) ? this.workplaceWebsite : '';
        } else {
            workplaceWebsiteInputId = `new-work-experience-workplace-website`;
            workplaceWebsiteInputValue = '';
        }
        
        const workplaceWebsiteInputGroup = await this.createInputGroup(
            'Workplace website', // Label
            'url', // Type
            workplaceWebsiteInputId, // Id
            true, // Will be validated
            workplaceWebsiteInputValue, // Value
            'Enter a url' // Placeholder
        );
        this.module.append(workplaceWebsiteInputGroup);

        // Add validation to workplace website input
        const workplaceWebsiteInput = workplaceWebsiteInputGroup.querySelector('input');
        await this.validator.addValidationToField(
            workplaceWebsiteInput, 'maxLength', '255', 'The workplace website can be a maximum of 255 characters'
        );

        // Create input group for start date and add to form
        let startDateInputId: string;
        let startDateInputValue: string;
        
        if (this.isEditMode) {
            startDateInputId = `work-experience-start-date-${this.id}`;
            startDateInputValue = this.startDate;
        } else {
            startDateInputId = `new-work-experience-start-date`;
            startDateInputValue = '';
        }
        
        const startDateInputGroup = await this.createInputGroup(
            'Start date', // Label
            'date', // Type
            startDateInputId, // Id
            true, // Will be validated
            startDateInputValue // Value
        );
        this.module.append(startDateInputGroup);

        // Add validation to start date input
        const startDateInput = startDateInputGroup.querySelector('input');
        await this.validator.addValidationToField(
            startDateInput, 'required', 'true', 'A start date is required', 'Start date'
        );

        // Create input group for end date and add to form
        let endDateInputId: string;
        let endDateInputValue: string;
        
        if (this.isEditMode) {
            endDateInputId = `work-experience-end-date-${this.id}`;
            endDateInputValue = (this.endDate) ? this.endDate : '';
        } else {
            endDateInputId = `new-work-experience-end-date`;
            endDateInputValue = '';
        }
        
        const endDateInputGroup = await this.createInputGroup(
            'End date', // Label
            'date', // Type
            endDateInputId, // Id
            true, // Will be validated
            endDateInputValue // Value
        );
        this.module.append(endDateInputGroup);

        const endDateInput = endDateInputGroup.querySelector('input');

        // // Create input group for order and add to form
        const orderInputGroup = await this.createOrderGroup('work-experience');
        const orderInput = orderInputGroup.querySelector('input');
        this.module.append(orderInputGroup);

        // Add event listener for validation on input for all fields
        await this.validator.addInputValidationEventListener([
            roleInput, 
            workplaceInput, 
            workplaceWebsiteInput, 
            startDateInput,
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
            roleInput,
            workplaceInput,
            workplaceWebsiteInput,
            startDateInput, 
            endDateInput,
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
        roleInput: HTMLInputElement, 
        workplaceInput: HTMLInputElement,
        workplaceWebsiteInput: HTMLInputElement,
        startDateInput: HTMLInputElement,
        endDateInput: HTMLInputElement,
        orderInput: HTMLInputElement
    ): Promise<void> {
        // Add event listener to form
        this.module.addEventListener('submit', async e => {
            e.preventDefault();

            // Validate fields
            if (!await this.validator.validateField(roleInput)) return;
            if (!await this.validator.validateField(workplaceInput)) return;
            if (!await this.validator.validateField(workplaceWebsiteInput)) return;
            if (!await this.validator.validateField(startDateInput)) return;
            if (!await this.validator.validateField(orderInput)) return;

            // Construct work experience object
            const workExperience = {
                role: roleInput.value,
                workplace: workplaceInput.value,
                workplace_website: workplaceWebsiteInput.value,
                start_date: startDateInput.value,
                end_date: endDateInput.value,
                order: parseInt(orderInput.value)
            }

            // // Calls update function or create function
            if (this.isEditMode) {
                await this.updateWorkExperience(workExperience);
            } else {
                await this.createWorkExperience(workExperience);
            }
        });
    }

    /**
     * Create work experience.
     */
    async createWorkExperience(workExperience: IWorkExperienceFillable): Promise<void> {
        const app = new App();
        
        // Create work experience in API
        let createdWorkExperience = await this.model.create(workExperience);

        // Write error if there is one
        if (createdWorkExperience.hasOwnProperty('error')) {
            await app.writeMessage('error', (createdWorkExperience as IError).error);
            return;
        }

        // Set values from created work experience
        this.id = (createdWorkExperience as IWorkExperience).id;
        this.role = (createdWorkExperience as IWorkExperience).role;
        this.workplace = (createdWorkExperience as IWorkExperience).workplace;
        this.workplaceWebsite = (createdWorkExperience as IWorkExperience).workplace_website;
        this.startDate = (createdWorkExperience as IWorkExperience).start_date;
        this.endDate = (createdWorkExperience as IWorkExperience).end_date;
        this.order = (createdWorkExperience as IWorkExperience).order;

        // Add a new work experience to list right before add form
        const list = this.module.parentElement.parentElement;
        const listItem = document.createElement('li') as HTMLLIElement;
        listItem.classList.add('work-experience', 'object', 'white');
        listItem.id = `work-experience-${this.id}`;
        await this.appendModule(
            new WorkExperienceArticle(
                this.apiUrl,
                this.user,
                this.id, 
                this.role, 
                this.workplace,
                this.workplaceWebsite,
                this.startDate,
                this.endDate,
                this.order
            ), listItem
        );
        await this.appendModule(
            new WorkExperienceForm(
                this.apiUrl, 
                this.user, 
                true,
                'Work experience',
                this.id, 
                this.role,
                this.workplace,
                this.workplaceWebsite,
                this.startDate,
                this.endDate,
                this.order
            ), listItem
        );
        list.insertBefore(listItem, this.module.parentElement);
        
        // Empty fields in form
        const fields = this.module.querySelectorAll('input');
        fields.forEach(field => {
            field.value = (field.type === 'number') ? '0' : '';
        });

        // Write success message
        await app.writeMessage('success', `The work experience was successfully added.`);
    }

    /**
     * Update work experience.
     */
     async updateWorkExperience(workExperience: IWorkExperienceFillable): Promise<void> {
        const app = new App();

        // Update work experience in API
        let updatedWorkExperience = await this.model.update(this.id, workExperience);

        // Write error if there is one
        if (updatedWorkExperience.hasOwnProperty('error')) {
            await app.writeMessage('error', (updatedWorkExperience as IError).error);
            return;
        }

        // Set values from updated work experience
        this.id = (updatedWorkExperience as IWorkExperience).id;
        this.role = (updatedWorkExperience as IWorkExperience).role;
        this.workplace = (updatedWorkExperience as IWorkExperience).workplace;
        this.workplaceWebsite = (updatedWorkExperience as IWorkExperience).workplace_website;
        this.startDate = (updatedWorkExperience as IWorkExperience).start_date;
        this.endDate = (updatedWorkExperience as IWorkExperience).end_date;
        this.order = (updatedWorkExperience as IWorkExperience).order;

        // Set new values to paragraphs in article
        const workExperienceArticle = this.module.previousElementSibling;

        const roleParagraph = workExperienceArticle.querySelector('.role-field > p') as HTMLParagraphElement;
        roleParagraph.innerText = this.role;

        const workplaceParagraph = workExperienceArticle.querySelector('.workplace-field > p') as HTMLParagraphElement;
        if (this.workplace) {
            workplaceParagraph.innerHTML = this.workplace;
        } else {
            workplaceParagraph.innerHTML = '<em>Add a workplace</em>';
        }

        const workplaceWebsiteParagraph = workExperienceArticle.querySelector('.workplace-website-field > p') as HTMLParagraphElement;
        if (this.workplaceWebsite) {
            workplaceWebsiteParagraph.innerHTML = this.workplaceWebsite;
        } else {
            workplaceWebsiteParagraph.innerHTML = '<em>Add a website</em>';
        }

        const startDateParagraph = workExperienceArticle.querySelector('.start-date-field > p') as HTMLParagraphElement;
        startDateParagraph.innerText = this.startDate;

        const endDateParagraph = workExperienceArticle.querySelector('.end-date-field > p') as HTMLParagraphElement;
        if (this.endDate) {
            endDateParagraph.innerHTML = this.endDate;
        } else {
            endDateParagraph.innerHTML = 'Present';
        }

        const orderParagraph = workExperienceArticle.querySelector('.order-field > p') as HTMLParagraphElement;
        orderParagraph.innerText = this.order.toString();

        // Hide form an show article
        this.module.classList.add('hidden');
        workExperienceArticle.classList.remove('hidden');

        // Set aria expanded to false on edit button
        const editButton = workExperienceArticle.querySelector('.edit-button');
        editButton.setAttribute('aria-expanded', 'false');

        // Write success message
        await app.writeMessage('success', `The work experience was successfully updated.`);
    }
}
