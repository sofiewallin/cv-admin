/**
 * Validator interface.
 * 
 * @author: Sofie Wallin
 */
 export default interface IValidator {
    validations: {
        field: HTMLInputElement, 
        type: string, 
        message: string
    }[]

    addValidationToInputField(
        field: HTMLInputElement, 
        attribute: string, 
        value: string|boolean, 
        message: string,
        fieldLabel?: string
    ): Promise<void>

    validateInputField(field: HTMLInputElement): Promise<boolean>

    returnErrorMessage(field: HTMLInputElement, type: string): Promise<string>

    writeErrorMessage(field: HTMLInputElement, errorMessage: string): Promise<void>
}