import App from "../../App";
import Validator from "../../Validator";
import Module from "./Module";
import Skill from "../../models/Skill";
import Project from "../../models/Project";
import WorkExperience from "../../models/WorkExperience";
import Education from "../../models/Education";
import IUser from "../../interfaces/IUser";
import IModel from "../../interfaces/IModel";
import IError from "../../interfaces/IError";
import IValidator from "../../interfaces/IValidator";

/**
 * Form base.
 * 
 * Serves as base for all forms that handles object,
 * does not serve as base for login form.
 * 
 * @author: Sofie Wallin
 */
export default class Form extends Module  {
    readonly isEditMode: boolean;
    readonly objectType: string;
    protected id: number;
    protected order: number;
    readonly validator: IValidator;
    readonly model: IModel;

    constructor(apiUrl: string, user: IUser, isEditMode: boolean, objectType: string, id?: number, order?: number) {
        super(apiUrl, user);

        this.isEditMode = isEditMode;
        this.objectType = objectType;
        this.id = id;
        this.order = order;

        this.validator = new Validator();

        // Set model
        switch (this.objectType) {
            case 'Project':
                this.model = new Project(this.apiUrl, this.user);
                break;
            case 'Skill':
                this.model = new Skill(this.apiUrl, this.user);
                break;
            case 'Work experience':
                this.model = new WorkExperience(this.apiUrl, this.user);
                break;
            case 'Education':
                this.model = new Education(this.apiUrl, this.user);
                break;
        }
    }

    /**
     * Create an input field.
     * 
     * Creates and returns a paragraph with a label
     * and an input field of given type.
     */
    async createInputGroup(
        fieldLabel: string,
        fieldType: string, 
        fieldName: string, 
        willBeValidated: boolean,
        fieldValue?: string,
        fieldPlaceholder?: string
    ): Promise<HTMLParagraphElement> {
        // Create paragraph container
        const pContainer = await this.createParagraph('', ['form-field', `form-${fieldType}-field`]);

        // Create label and add to paragraph
        const label = document.createElement('label') as HTMLLabelElement;
        label.setAttribute('for', fieldName); 
        label.innerText = fieldLabel;    

        pContainer.append(label);

        // Create input element and add to paragraph
        const input = document.createElement('input') as HTMLInputElement;
        input.type = fieldType;
        input.id = fieldName;
        input.name = fieldName;
        if (fieldPlaceholder) input.placeholder = fieldPlaceholder;
        if (fieldValue) input.value = fieldValue;
        pContainer.append(input);

        // Create error message container if the field will have validation
        if (willBeValidated) {
            const spanError = document.createElement('span') as HTMLSpanElement;
            spanError.classList.add('error');
            spanError.setAttribute('aria-live', 'polite');
            pContainer.append(spanError);
        }

        return pContainer;
    }

    /**
     * Create an input field.
     * 
     * Creates and returns a paragraph with a label
     * and an input field of given type.
     */
    async createOrderGroup(objectType: string, subType?: string): Promise<HTMLParagraphElement> {
        let id: string;
        let value: string;
        
        if (this.isEditMode) {
            id = `${objectType}-order-${this.id}`;
            value = this.order.toString();
        } else {
            id = (subType) ? `new-${subType}-${objectType}-order` : `new-${objectType}-order`;
            value = '0';
        }
        
        const orderInputGroup = await this.createInputGroup(
            'Order', // Label
            'number', // Type
            id, // Id
            true, // Will be validated
            value, // Value
        );
        

        // Add validation to order input
        const orderInput = orderInputGroup.querySelector('input');
        await this.validator.addValidationToField(
            orderInput, 'min', '0', 'Order needs to be at least 0'
        );
        await this.validator.addValidationToField(
            orderInput, 'required', 'true', 'Order is required', 'Order'
        );

        return orderInputGroup;
    }

    /**
     * Create a group with form button/buttons.
     * 
     * Creates and returns a paragraph with one add button
     * or a paragraph with a cancel button, a delete button 
     * and a save button if the form is in edit mode.
     */
    async createButtonsGroup(isEditMode: boolean): Promise<HTMLParagraphElement> {
        // Create paragraph container
        const pContainer = await this.createParagraph('', ['form-field', `form-buttons-field`]);

        if (isEditMode) {
            // Create cancel button
            const cancelButton = await this.createButton(
                'Cancel',
                false,
                ['cancel-button']
            );
            await this.handleCancelClick(cancelButton);
            pContainer.append(cancelButton);
            
            // Create delete button
            const deleteButton = await this.createButton(
                'Delete',
                true,
                ['delete-button']
            );
            await this.handleDeleteClick(deleteButton);
            pContainer.append(deleteButton);
            
            // Create save button
            const saveButton = await this.createButton(
                'Save',
                true,
                ['save-button']
            );
            pContainer.append(saveButton);
        } else {
            // Create add button
            const addButton = await this.createButton(
                'Add', 
                true, 
                ['add-button']
            );
            pContainer.append(addButton);
        }

        return pContainer;
    }

    /**
     * Handle click event on cancel button.
     */
    async handleCancelClick(button: HTMLButtonElement): Promise<void> {
        // Add event listener
        button.addEventListener('click', e => {
            e.preventDefault();

            // Hide form
            this.module.classList.add('hidden');

            // Show article
            const skillArticle = this.module.previousElementSibling;
            skillArticle.classList.remove('hidden');  

            // Set aria expanded to false
            const editButton = skillArticle.querySelector('.edit-button');
            editButton.setAttribute('aria-expanded', 'false');
        });
    }

    /**
     * Handle click event on delete button.
     */
    async handleDeleteClick(button: HTMLButtonElement): Promise<void> {
        // Add event listener
        button.addEventListener('click', async e => {
            e.preventDefault();

            // Ask if user is sure of delete before deleting
            if (confirm(`Are you sure you want to delete this ${this.objectType.toLowerCase()}?`)) {
                await this.deleteObject();
            }
        });
    }

    /**
     * Delete object.
     */
    async deleteObject(): Promise<void> {
        const app = new App();

        // Delete object in model
        let deletedObject = await this.model.delete(this.id);
        
        // Write error if there is one
        if (deletedObject.hasOwnProperty('error')) {
            await app.writeMessage('error', (deletedObject as IError).error);
            return;
        }

        // Remove list item
        this.module.parentElement.remove();

        // Write success message
        await app.writeMessage('success', `The ${this.objectType.toLowerCase()} was successfully deleted.`);
    }
}
