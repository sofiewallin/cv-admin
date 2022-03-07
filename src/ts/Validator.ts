export default class Validator {
    // Properties
    validations: {
        field: HTMLInputElement, 
        type: string, 
        message: string
    }[] = [];
    /**
     * Add validation to input field.
     * 
     * Sets html input validation of specific type.
     */    
    async addValidationToInputField(
        field: HTMLInputElement, 
        attribute: string, 
        value: string|boolean, 
        message: string,
        fieldLabel?: string): Promise<void>
    {
        if (attribute === 'required') {
            field.required = true;

            const label = field.previousElementSibling;
            label.innerHTML = `${fieldLabel} <abbr title="required" class="required">*</abbr>`;
        } else {
            field.setAttribute(attribute, (value as string));
        }

        field.addEventListener('input', async () => {
            await this.validateInputField(field);
        });

        this.validations.push({
            field: field,
            type: attribute,
            message: message
        });
    }

    /**
     * Validate input field on input.
     */
    async validateInputField(field: HTMLInputElement): Promise<boolean> {
        const fieldError = field.nextElementSibling as HTMLSpanElement;
        if (field.validity.valid) {
            field.classList.add('valid');
            if (field.classList.contains('invalid')) field.classList.remove('invalid');
            fieldError.innerText = '';
            fieldError.classList.add('error');
            return true;
        } else {
            let errorMessage: string;
            if (field.validity.valueMissing) {
                errorMessage = await this.returnErrorMessage(field, 'required');
            } else if (field.validity.tooShort) {
                errorMessage = await this.returnErrorMessage(field, 'minLength');
            } else if (field.validity.tooLong) {
                errorMessage = await this.returnErrorMessage(field, 'maxLength');
            } else if (field.validity.rangeUnderflow) {
                errorMessage = await this.returnErrorMessage(field, 'min');
            } else if (field.validity.typeMismatch) {
                if (field.type === 'url') {
                    errorMessage = 'Enter a valid url';
                }
            }

            await this.writeErrorMessage(field, errorMessage);

            return false;
        }
    }

    async returnErrorMessage(field: HTMLInputElement, type: string): Promise<string> {
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
     */
    async writeErrorMessage(field: HTMLInputElement, errorMessage: string): Promise<void> {
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
