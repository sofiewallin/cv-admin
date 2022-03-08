import App from "../../App";
import Module from "./Module";
import Skill from "../../models/Skill";
import Project from "../../models/Project";
import WorkExperience from "../../models/WorkExperience";
import Education from "../../models/Education";
import IUser from "../../interfaces/IUser";
import IModel from "../../interfaces/IModel";
import IError from "../../interfaces/IError";
import IValidator from "../../interfaces/IValidator";
import Validator from "../../Validator";

export default class Form extends Module  {
    // Properties
    readonly isEditMode: boolean;
    readonly objectType: string;
    protected id: number;
    readonly validator: IValidator;
    readonly model: IModel;

    /**
     * Constructor
     */
    constructor(apiUrl: string, user: IUser, isEditMode: boolean, objectType: string, id?: number) {
        super(apiUrl, user);

        this.isEditMode = isEditMode;
        this.objectType = objectType;
        this.id = id;

        this.validator = new Validator();

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
     * Return a input group.
     * 
     * Creates and returns a paragraph with a label
     * and an input field of given type.
     */
    async returnInputGroup(
        fieldLabel: string,
        fieldType: string, 
        fieldName: string, 
        willBeValidated: boolean,
        fieldValue: string,
        fieldPlaceholder?: string
    ): Promise<HTMLParagraphElement> {
        // Create paragraph container
        const pContainer = await this.returnParagraph('', ['form-field', `form-${fieldType}-field`]);

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
        input.placeholder = fieldPlaceholder;
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
     * Return a buttons group.
     * 
     * Creates and returns a paragraph with one add button
     * or a cancel button, delete button and save button if 
     * the form is in edit mode.
     */
    async returnButtonsGroup(isEditMode: boolean): Promise<HTMLParagraphElement> {
        // Paragraph container
        const pContainer = await this.returnParagraph('', ['form-field', `form-buttons-field`]);

        if (isEditMode) {
            // Cancel button
            const cancelButton = await this.returnButton(
                'Cancel',
                false,
                ['cancel-button']
            );
            await this.handleCancelClick(cancelButton);
            pContainer.append(cancelButton);
            
            // Delete button
            const deleteButton = await this.returnButton(
                'Delete',
                true,
                ['delete-button']
            );
            await this.handleDeleteClick(deleteButton);
            pContainer.append(deleteButton);
            
            // Save button
            const saveButton = await this.returnButton(
                'Save',
                true,
                ['save-button']
            );
            pContainer.append(saveButton);
        } else {
            // Add button
            const addButton = await this.returnButton(
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

            this.module.classList.add('hidden');

            const skillArticle = this.module.previousElementSibling;
            skillArticle.classList.remove('hidden');  

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
        let deletedObject = await this.model.delete(this.id);
        

        if (deletedObject.hasOwnProperty('error')) {
            await app.writeMessage('error', (deletedObject as IError).error);
            return;
        }

        this.module.parentElement.remove();
        await app.writeMessage('success', `The ${this.objectType.toLowerCase()} was successfully deleted.`);
    }
}
