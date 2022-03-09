import App from "../../../App";
import Form from "../Form";
import IModule from "../../../interfaces/IModule";
import IUser from "../../../interfaces/IUser";
import ISkillFillable from "../../../interfaces/skill/ISkillFillable";
import IError from "../../../interfaces/IError";
import ISkill from "../../../interfaces/skill/ISkill";
import SkillArticle from "./SkillArticle";

/**
 * Skills form module.
 * 
 * @author: Sofie Wallin
 */
export default class SkillForm extends Form implements IModule  {
    protected title: string;
    readonly skillType: string;

    constructor(
        apiUrl: string, 
        user: IUser, 
        isEditMode: boolean, 
        objectType: string, 
        skillType: string, 
        id?: number, 
        title?: string, 
        order?: number
    ) {
        super(apiUrl, user, isEditMode, objectType, id, order);

        this.skillType = skillType;
        this.title = title;
    }

    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create form and set as module
        let form: HTMLFormElement;
        if (this.isEditMode) {
            form = await this.createForm(['edit-form', 'hidden'], `skill-edit-form-${this.id}`);
        } else {
            form = await this.createForm(['add-form']);
            form.classList.add('add-form');
        }
        this.module = form;

        // Create input group for skill title and add to form
        let skillInputGroup: HTMLParagraphElement;
        if (this.isEditMode) {
            // Create form with valus if edit mode
            skillInputGroup = await this.createInputGroup(
                'Skill', // Label
                'text', // Type
                `skill-title-${this.id}`, // Id
                true, // Will be validated
                this.title, // Value
                'Enter a skill' // Placeholder
            );
        } else {
            // Create form with empty values if not edit mode
            skillInputGroup = await this.createInputGroup(
                'Skill', // Label
                'text', // Type
                `new-${this.skillType}-skill-title`, // Id
                true, // Will be validated
                '', // Value
                'Enter a skill' // Placeholder
            );
        }
        this.module.append(skillInputGroup);

        // Add validation to skill title input
        const skillInput = skillInputGroup.querySelector('input');
        await this.validator.addValidationToField(
            skillInput, 'minLength', '2', 'Enter a skill with at least 2 characters'
        );
        await this.validator.addValidationToField(
            skillInput, 'maxLength', '64', 'The skill can be a maximum of 64 characters'
        );
        await this.validator.addValidationToField(
            skillInput, 'required', 'true', 'A skill is required', 'Skill'
        );
        
        // // Create input group for skill order and add to form
        let orderInputGroup: HTMLParagraphElement;
        if (this.isEditMode) {
            orderInputGroup = await this.createInputGroup(
                'Order', // Label
                'number', // Type
                `skill-order-${this.id}`, // Id
                true, // Will be validated
                this.order.toString() // Value
            );
        } else {
            orderInputGroup = await this.createInputGroup(
                'Order', // Label
                'number', // Type
                `new-${this.skillType}-skill-order`, // Id
                true, // Will be validated
                '0' // Value
            );
        }

        // Add validation to skill order input
        const orderInput = orderInputGroup.querySelector('input');
        await this.validator.addValidationToField(
            orderInput, 'min', '0', 'Order needs to be at least 0'
        );
        await this.validator.addValidationToField(
            orderInput, 'required', 'true', 'Order is required', 'Order'
        );
        this.module.append(orderInputGroup);

        // Create buttons group and add to form
        let buttonsGroup: HTMLParagraphElement;
        if (this.isEditMode) {
            buttonsGroup = await this.createButtonsGroup(true);
        } else {
            buttonsGroup = await this.createButtonsGroup(false);
        }
        this.module.append(buttonsGroup);

        // Add event listener to form submit event
        await this.handleSubmit(skillInput, orderInput);

        return this.module;
    }

    /**
     * Handle submit.
     * 
     * Adds event listener to form submit event that
     * checks if submit is an edit or an add and calls
     * the right function.
     */
    async handleSubmit(skillInput: HTMLInputElement, orderInput: HTMLInputElement): Promise<void> {
        // Add event listener to form
        this.module.addEventListener('submit', async e => {
            e.preventDefault();

            // Validate fields
            if (!await this.validator.validateField(skillInput)) return;
            if (!await this.validator.validateField(orderInput)) return;

            // Construct skill object
            this.title = skillInput.value;
            this.order = parseInt(orderInput.value);

            const skill = {
                title: this.title,
                type: this.skillType,
                order: this.order
            }

            // Calls update function or create function
            if (this.isEditMode) {
                await this.updateSkill(skill);
            } else {
                await this.createSkill(skill);
            }
        });
    }

    /**
     * Create skill.
     */
    async createSkill(skill: ISkillFillable): Promise<void> {
        const app = new App();
        
        // Create skill in API
        let createdSkill = await this.model.create(skill);

        // Write error if there is one
        if (createdSkill.hasOwnProperty('error')) {
            await app.writeMessage('error', (createdSkill as IError).error);
            return;
        }

        // Set values from created skill
        this.id = (createdSkill as ISkill).id;
        this.title = (createdSkill as ISkill).title;
        this.order = (createdSkill as ISkill).order;

        // Add a new skill to list right before add form
        const list = this.module.parentElement.parentElement;
        const listItem = document.createElement('li') as HTMLLIElement;
        listItem.id = `skill-${this.id}`;
        await this.appendModule(
            new SkillArticle(
                this.apiUrl,
                this.user,
                this.id, 
                this.title, 
                this.order
            ), listItem
        );
        await this.appendModule(
            new SkillForm(
                this.apiUrl, 
                this.user, 
                true,
                'Skill',
                (createdSkill as ISkill).type,
                this.id, 
                this.title, 
                this.order
            ), listItem
        );
        list.insertBefore(listItem, this.module.parentElement);
        
        // Empty fields in form
        const fields = this.module.querySelectorAll('input');
        fields.forEach(field => {
            field.value = '';
        });

        // Write success message
        await app.writeMessage('success', `The ${this.objectType.toLowerCase()} was successfully added.`);
    }

    /**
     * Update skill.
     */
    async updateSkill(skill: ISkillFillable): Promise<void> {
        const app = new App();

        // Update skill in API
        let updatedSkill = await this.model.update(this.id, skill);

        // Write error if there is one
        if (updatedSkill.hasOwnProperty('error')) {
            await app.writeMessage('error', (updatedSkill as IError).error);
            return;
        }

        // Set values from updated skill
        this.title = (updatedSkill as ISkill).title;
        this.order = (updatedSkill as ISkill).order;

        // Set new values to paragraphs in article
        const skillArticle = this.module.previousElementSibling;

        const skillTitle = skillArticle.querySelector('.skill-title > p') as HTMLParagraphElement;
        skillTitle.innerText = this.title;

        const skillOrder = skillArticle.querySelector('.skill-order > p') as HTMLParagraphElement;
        skillOrder.innerText = this.order.toString();

        // Hide form an show article
        this.module.classList.add('hidden');
        skillArticle.classList.remove('hidden');

        // Set aria expanded to false on edit button
        const editButton = skillArticle.querySelector('.edit-button');
        editButton.setAttribute('aria-expanded', 'false');

        // Write success message
        await app.writeMessage('success', `The ${this.objectType.toLowerCase()} was successfully updated.`);
    }
}
