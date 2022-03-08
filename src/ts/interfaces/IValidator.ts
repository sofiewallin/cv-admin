/**
 * Validator interface.
 * 
 * @author: Sofie Wallin
 */
export default interface IValidator {
    validations: {
        field: HTMLInputElement|HTMLTextAreaElement, 
        type: string, 
        message: string
    }[]

    addValidationToField(
        field: HTMLInputElement|HTMLTextAreaElement, 
        attribute: string, 
        value: string|boolean, 
        message: string,
        fieldLabel?: string
    ): Promise<void>

    validateField(field: HTMLInputElement|HTMLTextAreaElement): Promise<boolean>

    setErrorMessage(field: HTMLInputElement|HTMLTextAreaElement, type: string): Promise<string>

    writeErrorMessage(field: HTMLInputElement|HTMLTextAreaElement, errorMessage: string): Promise<void>
}