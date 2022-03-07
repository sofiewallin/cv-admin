import Module from "./Module";
import IUser from "../../interfaces/IUser";

export default class Form extends Module  {
    // Properties
    readonly isEditMode: boolean;

    /**
     * Constructor
     */
    constructor(apiUrl: string, user: IUser, isEditMode: boolean) {
        super(apiUrl, user);

        this.isEditMode = isEditMode;
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
                ['cancel-button']
            );
            pContainer.append(cancelButton);
            
            // Delete button
            const deleteButton = await this.returnButton(
                'Delete',
                true,
                ['delete-button']
            );
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
}