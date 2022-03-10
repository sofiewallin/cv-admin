import App from "../../../App";
import Form from "../Form";
import IModule from "../../../interfaces/IModule";
import IUser from "../../../interfaces/IUser";
import IEducation from "../../../interfaces/education/IEducation";
import IEducationFillable from "../../../interfaces/education/IEducationFillable";
import IError from "../../../interfaces/IError";
import EducationArticle from "./EducationArticle";

/**
 * Education form module.
 * 
 * @author: Sofie Wallin
 */
export default class EducationForm extends Form implements IModule  {
    readonly type: string;
    protected name: string;
    protected degree: string;
    protected institution: string;
    protected institutionWebsite: string;
    protected startDate: string;
    protected endDate: string;

    constructor(
        apiUrl: string, 
        user: IUser, 
        isEditMode: boolean, 
        objectType: string, 
        type: string,
        id?: number, 
        name?: string, 
        degree?: string, 
        institution?: string, 
        institutionWebsite?: string,
        startDate?: string,
        endDate?: string,
        order?: number
    ) {
        super(apiUrl, user, isEditMode, objectType, id, order);

        this.name = name;
        this.degree = degree;
        this.institution = institution;
        this.institutionWebsite = institutionWebsite;
        this.startDate = startDate;
        this.endDate = endDate;
        this.type = type;
    }

    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create form and set as module
        let form: HTMLFormElement;
        if (this.isEditMode) {
            form = await this.createForm(['edit-form', 'hidden'], `education-edit-form-${this.id}`);
        } else {
            form = await this.createForm(['add-form']);
            form.classList.add('add-form');
        }
        this.module = form;

        // Create input group for name and add to form
        let nameInputId: string;
        let nameInputValue: string;
        
        if (this.isEditMode) {
            nameInputId = `education-name-${this.id}`;
            nameInputValue = this.name;
        } else {
            nameInputId = `new-education-${this.type.toLowerCase()}-name`;
            nameInputValue = '';
        }
        
        const nameInputGroup = await this.createInputGroup(
            'Name', // Label
            'text', // Type
            nameInputId, // Id
            true, // Will be validated
            nameInputValue, // Value
            'Enter a name'
        );
        this.module.append(nameInputGroup);

        // Add validation to name input
        const nameInput = nameInputGroup.querySelector('input');
        await this.validator.addValidationToField(
            nameInput, 'minLength', '2', 'Enter a name with at least 2 characters'
        );
        await this.validator.addValidationToField(
            nameInput, 'maxLength', '64', 'The name can be a maximum of 64 characters'
        );
        await this.validator.addValidationToField(
            nameInput, 'required', 'true', 'A name is required', 'Name'
        );

        // Create input group for degree if program and add to form
        let degreeInput: HTMLInputElement = null;
        if (this.type === 'Program') {
            let degreeInputId: string;
            let degreeInputValue: string;
            
            if (this.isEditMode) {
                degreeInputId = `education-degree-${this.id}`;
                degreeInputValue = (this.degree) ? this.degree : '';
            } else {
                degreeInputId = `new-education-${this.type.toLowerCase()}-degree`;
                degreeInputValue = '';
            }
            
            const degreeInputGroup = await this.createInputGroup(
                'Degree', // Label
                'text', // Type
                degreeInputId, // Id
                true, // Will be validated
                degreeInputValue, // Value
                'Enter a degree' // Placeholder
            );
            this.module.append(degreeInputGroup);

            // Add validation to institution website input
            degreeInput = degreeInputGroup.querySelector('input');
            await this.validator.addValidationToField(
                degreeInput, 'maxLength', '255', 'The degree can be a maximum of 255 characters'
            );

        }
        // Create input group for institution and add to form
        let institutionInputId: string;
        let institutionInputValue: string;
        
        if (this.isEditMode) {
            institutionInputId = `education-institution-${this.id}`;
            institutionInputValue = (this.institution) ? this.institution : '';
        } else {
            institutionInputId = `new-education-${this.type.toLowerCase()}-institution`;
            institutionInputValue = '';
        }
        
        const institutionInputGroup = await this.createInputGroup(
            'Institution', // Label
            'text', // Type
            institutionInputId, // Id
            true, // Will be validated
            institutionInputValue, // Value
            'Enter an institution' // Placeholder
        );
        this.module.append(institutionInputGroup);

        // Add validation to institution input
        const institutionInput = institutionInputGroup.querySelector('input');
        await this.validator.addValidationToField(
            institutionInput, 'minLength', '2', 'Enter an institution with at least 2 characters'
        );
        await this.validator.addValidationToField(
            institutionInput, 'maxLength', '64', 'The institution can be a maximum of 64 characters'
        );
        await this.validator.addValidationToField(
            institutionInput, 'required', 'true', 'An institution is required', 'Institution'
        );

        // Create input group for institution website and add to form
        let institutionWebsiteInputId: string;
        let institutionWebsiteInputValue: string;
        
        if (this.isEditMode) {
            institutionWebsiteInputId = `education-institution-website-${this.id}`;
            institutionWebsiteInputValue = (this.institutionWebsite) ? this.institutionWebsite : '';
        } else {
            institutionWebsiteInputId = `new-education-${this.type.toLowerCase()}-institution-website`;
            institutionWebsiteInputValue = '';
        }
        
        const institutionWebsiteInputGroup = await this.createInputGroup(
            'Institution website', // Label
            'url', // Type
            institutionWebsiteInputId, // Id
            true, // Will be validated
            institutionWebsiteInputValue, // Value
            'Enter a url' // Placeholder
        );
        this.module.append(institutionWebsiteInputGroup);

        // Add validation to institution website input
        const institutionWebsiteInput = institutionWebsiteInputGroup.querySelector('input');
        await this.validator.addValidationToField(
            institutionWebsiteInput, 'maxLength', '255', 'The institution website can be a maximum of 255 characters'
        );

        // Create input group for start date and add to form
        let startDateInputId: string;
        let startDateInputValue: string;
        
        if (this.isEditMode) {
            startDateInputId = `education-start-date-${this.id}`;
            startDateInputValue = this.startDate.toString();
        } else {
            startDateInputId = `new-education-${this.type.toLowerCase()}-start-date`;
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
            endDateInputId = `education-end-date-${this.id}`;
            endDateInputValue = (this.endDate) ? this.endDate : '';
        } else {
            endDateInputId = `new-education-${this.type.toLowerCase()}-end-date`;
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

        // Create input group for order and add to form
        const orderInputGroup = await this.createOrderGroup('education', this.type.toLowerCase());
        const orderInput = orderInputGroup.querySelector('input');
        this.module.append(orderInputGroup);

        // Add event listener for validation on input for all fields
        if (degreeInput) {
            await this.validator.addInputValidationEventListener([
                nameInput, 
                degreeInput,
                institutionInput, 
                institutionWebsiteInput, 
                startDateInput,
                orderInput
            ]);
        } else {
            await this.validator.addInputValidationEventListener([
                nameInput,
                institutionInput, 
                institutionWebsiteInput, 
                startDateInput,
                orderInput
            ]);
        }

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
            nameInput,
            degreeInput,
            institutionInput,
            institutionWebsiteInput,
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
        nameInput: HTMLInputElement, 
        degreeInput: HTMLInputElement,
        institutionInput: HTMLInputElement,
        institutionWebsiteInput: HTMLInputElement,
        startDateInput: HTMLInputElement,
        endDateInput: HTMLInputElement,
        orderInput: HTMLInputElement
    ): Promise<void> {
        // Add event listener to form
        this.module.addEventListener('submit', async e => {
            e.preventDefault();

            // Validate fields
            if (!await this.validator.validateField(nameInput)) return;
            if (degreeInput) if (!await this.validator.validateField(degreeInput)) return;
            if (!await this.validator.validateField(institutionInput)) return;
            if (!await this.validator.validateField(institutionWebsiteInput)) return;
            if (!await this.validator.validateField(startDateInput)) return;
            if (!await this.validator.validateField(orderInput)) return;

            // Construct education object
            let degreeValue = (degreeInput) ? degreeInput.value : null;

            const education = {
                name: nameInput.value,
                degree: degreeValue,
                institution: institutionInput.value,
                institution_website: institutionWebsiteInput.value,
                start_date: startDateInput.value,
                end_date: endDateInput.value,
                type: this.type,
                order: parseInt(orderInput.value)
            }

            // // Calls update function or create function
            if (this.isEditMode) {
                await this.updateEducation(education);
            } else {
                await this.createEducation(education);
            }
        });
    }

    /**
     * Create education.
     */
    async createEducation(education: IEducationFillable): Promise<void> {
        const app = new App();
        
        // Create education in API
        let createdEducation = await this.model.create(education);

        // Write error if there is one
        if (createdEducation.hasOwnProperty('error')) {
            await app.writeMessage('error', (createdEducation as IError).error);
            return;
        }

        // Set values from created education
        this.id = (createdEducation as IEducation).id;
        this.name = (createdEducation as IEducation).name;
        this.degree = (createdEducation as IEducation).degree;
        this.institution = (createdEducation as IEducation).institution;
        this.institutionWebsite = (createdEducation as IEducation).institution_website;
        this.startDate = (createdEducation as IEducation).start_date;
        this.endDate = (createdEducation as IEducation).end_date;
        this.order = (createdEducation as IEducation).order;

        // Add a new education to list right before add form
        const list = this.module.parentElement.parentElement;
        const listItem = document.createElement('li') as HTMLLIElement;
        listItem.id = `education-${this.id}`;
        await this.appendModule(
            new EducationArticle(
                this.apiUrl,
                this.user,
                this.id, 
                this.name, 
                this.degree,
                this.institution,
                this.institutionWebsite,
                this.startDate,
                this.endDate,
                this.type,
                this.order
            ), listItem
        );
        await this.appendModule(
            new EducationForm(
                this.apiUrl, 
                this.user, 
                true,
                'Education',
                this.type,
                this.id, 
                this.name,
                this.degree,
                this.institution,
                this.institutionWebsite,
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
        await app.writeMessage('success', `The education was successfully added.`);
    }

    /**
     * Update education.
     */
     async updateEducation(education: IEducationFillable): Promise<void> {
        const app = new App();

        // Update education in API
        let updatedEducation = await this.model.update(this.id, education);

        // Write error if there is one
        if (updatedEducation.hasOwnProperty('error')) {
            await app.writeMessage('error', (updatedEducation as IError).error);
            return;
        }

        // Set values from updated education
        this.id = (updatedEducation as IEducation).id;
        this.name = (updatedEducation as IEducation).name;
        this.degree = (updatedEducation as IEducation).degree;
        this.institution = (updatedEducation as IEducation).institution;
        this.institutionWebsite = (updatedEducation as IEducation).institution_website;
        this.startDate = (updatedEducation as IEducation).start_date;
        this.endDate = (updatedEducation as IEducation).end_date;
        this.order = (updatedEducation as IEducation).order;

        // Set new values to paragraphs in article
        const educationArticle = this.module.previousElementSibling;

        const nameParagraph = educationArticle.querySelector('.education-name > p') as HTMLParagraphElement;
        nameParagraph.innerText = this.name;

        if (this.type === 'Program') {
            const degreeParagraph = educationArticle.querySelector('.education-degree > p') as HTMLParagraphElement;
            if (this.degree) {
                degreeParagraph.innerHTML = this.degree;
            } else {
                degreeParagraph.innerHTML = '<em>Add a degree</em>';
            }
        }

        const institutionParagraph = educationArticle.querySelector('.education-institution > p') as HTMLParagraphElement;
        institutionParagraph.innerText = this.institution;

        const institutionWebsiteParagraph = educationArticle.querySelector('.education-institution-website > p') as HTMLParagraphElement;
        if (this.institutionWebsite) {
            institutionWebsiteParagraph.innerHTML = this.institutionWebsite;
        } else {
            institutionWebsiteParagraph.innerHTML = '<em>Add a website</em>';
        }

        const startDateParagraph = educationArticle.querySelector('.education-start-date > p') as HTMLParagraphElement;
        startDateParagraph.innerText = this.startDate;

        const endDateParagraph = educationArticle.querySelector('.education-end-date > p') as HTMLParagraphElement;
        if (this.endDate) {
            endDateParagraph.innerHTML = this.endDate;
        } else {
            endDateParagraph.innerHTML = 'Present';
        }

        const orderParagraph = educationArticle.querySelector('.education-order > p') as HTMLParagraphElement;
        orderParagraph.innerText = this.order.toString();

        // Hide form an show article
        this.module.classList.add('hidden');
        educationArticle.classList.remove('hidden');

        // Set aria expanded to false on edit button
        const editButton = educationArticle.querySelector('.edit-button');
        editButton.setAttribute('aria-expanded', 'false');

        // Write success message
        await app.writeMessage('success', `The education was successfully updated.`);
    }
}
