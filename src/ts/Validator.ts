import IValidator from "./interfaces/IValidator";

/**
 * Validator.
 * 
 * Handles validation of form fields. Adds validation
 * on fields, validates fields and also handles error 
 * messages.
 * 
 * @author: Sofie Wallin
 */
export default class Validator implements IValidator {
    validations: {
        field: HTMLInputElement|HTMLTextAreaElement, 
        type: string, 
        message: string
    }[] = [];

    /**
     * Add validation to input or textarea field.
     * 
     * Sets HTML validation of specific type and value.
     */    
    async addValidationToField(
        field: HTMLInputElement|HTMLTextAreaElement, 
        attribute: string, 
        value: string, 
        message: string,
        fieldLabel?: string
    ): Promise<void> {
        if (attribute === 'required') {
            // Set attribute
            field.required = true;

            // Set label with asterisk
            const label = field.previousElementSibling;
            label.innerHTML = `${fieldLabel}<abbr title="required" class="required">*</abbr>`;
        } else {
            // Set attribute
            field.setAttribute(attribute, (value as string));
        }

        // Add validation to list
        this.validations.push({
            field: field,
            type: attribute,
            message: message
        });
    }

    /**
     * Add input event listener for validation.
     * 
     * Adds input event listener for validation
     * to given input or textarea fields.
     */
    async addInputValidationEventListener(fields: HTMLElement[]): Promise<void> {
        // Add event listener on input
        fields.forEach(field => {
            field.addEventListener('input', async () => {
                await this.validateField(field as HTMLInputElement|HTMLTextAreaElement);
            });
        });
    }

    /**
     * Validate field on input.
     * 
     * Handles the validation of the field.
     */
    async validateField(field: HTMLInputElement|HTMLTextAreaElement): Promise<boolean> {
        // Get error container
        const fieldError = field.nextElementSibling as HTMLSpanElement;

        if (field.validity.valid) {
            // Set field to valid and deactivated error container
            field.classList.add('valid');
            if (field.classList.contains('invalid')) field.classList.remove('invalid');
            fieldError.innerText = '';
            fieldError.classList.remove('is-active');

            return true;
        } else {
            // Set error message according to type of validation
            let errorMessage: string;
            if (field.validity.valueMissing) {
                errorMessage = await this.setErrorMessage(field, 'required');
            } else if (field.validity.tooShort) {
                errorMessage = await this.setErrorMessage(field, 'minLength');
            } else if (field.validity.tooLong) {
                errorMessage = await this.setErrorMessage(field, 'maxLength');
            } else if (field.validity.rangeUnderflow) {
                errorMessage = await this.setErrorMessage(field, 'min');
            } else if (field.validity.typeMismatch) {
                if (field.type === 'url') {
                    errorMessage = 'Enter a valid url';
                }
            }

            // Write error message
            await this.writeErrorMessage(field, errorMessage);

            return false;
        }
    }

    /**
     * Set error message.
     * 
     * Gets error message from validation list 
     * based on field and type.
     */
    async setErrorMessage(field: HTMLInputElement|HTMLTextAreaElement, type: string): Promise<string> {
        let errorMessage: string;

        this.validations.forEach(validation => {
            if (validation.field === field && validation.type === type) {
                errorMessage = validation.message;
            }
        });

        return errorMessage;
    }

    /**
     * Write error message.
     * 
     * Sets field to invalid, activates error 
     * container and displays message.
     */
    async writeErrorMessage(field: HTMLInputElement|HTMLTextAreaElement, errorMessage: string): Promise<void> {
        const fieldError = field.nextElementSibling as HTMLSpanElement;

        if (field.classList.contains('valid')) {
            field.classList.replace('valid','invalid');
        } else {
            field.classList.add('invalid');
        }
        fieldError.innerHTML = errorMessage;
        fieldError.classList.add('is-active');
    }
}
