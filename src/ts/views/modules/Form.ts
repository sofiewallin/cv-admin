import App from "../../App";
import Module from "./Module";
import Skill from "../../models/Skill";
import Project from "../../models/Project";
import WorkExperience from "../../models/WorkExperience";
import Education from "../../models/Education";
import IUser from "../../interfaces/IUser";
import IModel from "../../interfaces/IModel";
import IError from "../../interfaces/IError";

export default class Form extends Module  {
    // Properties
    readonly isEditMode: boolean;
    readonly id: number;

    /**
     * Constructor
     */
    constructor(apiUrl: string, user: IUser, isEditMode: boolean, id?: number) {
        super(apiUrl, user);

        this.isEditMode = isEditMode;
        this.id = id;
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
        isRequired: boolean,
        willBeValidated: true,
        fieldValue: string,
        fieldPlaceholder?: string
    ): Promise<HTMLParagraphElement> {
        // Create paragraph container
        const pContainer = await this.returnParagraph('', ['form-field', `form-${fieldType}-field`]);

        // Create label and add to paragraph
        const label = document.createElement('label') as HTMLLabelElement;
        label.setAttribute('for', fieldName);     
        if (isRequired) {
            label.innerHTML = `${fieldLabel} <abbr title="required" class="required">*</abbr>`;
        } else {
            label.innerText = fieldLabel;
        }

        pContainer.append(label);

        // Create input element and add to paragraph
        const input = document.createElement('input') as HTMLInputElement;
        input.type = fieldType;
        input.id = fieldName;
        input.name = fieldName;
        input.placeholder = fieldPlaceholder;
        if (fieldValue) input.value = fieldValue;
        if (isRequired) input.required = true;
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
                true,
                ['cancel-button']
            );
            await this.handleCancelClick(cancelButton);
            pContainer.append(cancelButton);
            
            // Delete button
            const deleteButton = await this.returnButton(
                'Delete',
                true,
                true,
                ['delete-button']
            );
            await this.handleDeleteClick(deleteButton);
            pContainer.append(deleteButton);
            
            // Save button
            const saveButton = await this.returnButton(
                'Save',
                true,
                true,
                ['save-button']
            );
            await this.handleSaveClick(saveButton);
            pContainer.append(saveButton);
        } else {
            // Add button
            const addButton = await this.returnButton(
                'Add', 
                true, 
                false,
                ['add-button']
            );
            await this.handleAddClick(addButton);
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
            
            const buttons = this.module.querySelectorAll('button');
            buttons.forEach(button => {
                button.disabled = true;
            });
        });
    }

    /**
     * Handle click event on delete button.
     */
    async handleDeleteClick(button: HTMLButtonElement): Promise<void> {
        // Add event listener
        button.addEventListener('click', e => {
            e.preventDefault();

            const objectType = this.module.previousElementSibling.classList.item(0);

            if (confirm(`Are you sure you want to delete this ${objectType}?`)) {
                switch (objectType) {
                    case 'project': 
                        this.deleteObject(new Project(this.apiUrl, this.user), objectType);
                        break;
                    case 'skill':
                        this.deleteObject(new Skill(this.apiUrl, this.user), objectType);
                        break;
                    case 'work-experience':
                        this.deleteObject(new WorkExperience(this.apiUrl, this.user), objectType);
                        break;
                    case 'education':
                        this.deleteObject(new Education(this.apiUrl, this.user), objectType);
                        break;
                }
            }
        });
    }

    /**
     * Delete project.
     */
    async deleteObject(model: IModel, objectType: string): Promise<void> {
        const app = new App();
        let deletedObject = await model.delete(this.id);
        

        if (deletedObject.hasOwnProperty('error')) {
            await app.writeMessage('error', (deletedObject as IError).error);
            return;
        }

        this.module.parentElement.remove();
        await app.writeMessage('success', `The ${objectType} was successfully deleted.`);
        
    }

    /**
     * Handle click event on save button.
     */
    async handleSaveClick(button: HTMLButtonElement): Promise<void> {
        // Add event listener
        button.addEventListener('click', e => {
            e.preventDefault();

            console.log(`updating ${this.module.previousElementSibling.classList.item(0)} with id ${this.id}`);
        });
    }

    /**
     * Handle click event on add button.
     */
    async handleAddClick(button: HTMLButtonElement): Promise<void> {
        // Add event listener
        button.addEventListener('click', e => {
            e.preventDefault();

            console.log(`adding ${this.module.parentElement.classList.item(0).replace('new-', '')}`);
        });
    }

    
}