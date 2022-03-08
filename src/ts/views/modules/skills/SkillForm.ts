import App from "../../../App";
import Form from "../Form";
import IModule from "../../../interfaces/IModule";
import IUser from "../../../interfaces/IUser";
import ISkillFillable from "../../../interfaces/ISkillFillable";
import IError from "../../../interfaces/IError";
import ISkill from "../../../interfaces/ISkill";
import SkillArticle from "./SkillArticle";

export default class SkillForm extends Form implements IModule  {
    // Properties
    protected title: string;
    protected order: number;
    readonly skillType: string;

    /**
     * Constructor
     */
    constructor(apiUrl: string, user: IUser, isEditMode: boolean, objectType: string, skillType: string, id?: number, title?: string, order?: number) {
        super(apiUrl, user, isEditMode, objectType, id);

        this.skillType = skillType;
        this.title = title;
        this.order = order;
    }

    /**
     * Return module.
     */
    async return(): Promise<HTMLElement> {
        const form = document.createElement('form') as HTMLFormElement;
        form.action = '/';
        if (this.isEditMode) {
            form.classList.add('edit-form', 'hidden');
        } else {
            form.classList.add('add-form');
        }
        form.noValidate = true;
        this.module = form;

        // Create input group for skill title and add to form
        let skillInputGroup: HTMLParagraphElement;
        if (this.isEditMode) {
            skillInputGroup = await this.returnInputGroup(
                'Skill', // Label
                'text', // Type
                `skill-title-${this.id}`, // Id
                true, // Will be validated
                this.title, // Value
                'Enter a skill' // Placeholder
            );
        } else {
            skillInputGroup = await this.returnInputGroup(
                'Skill', // Label
                'text', // Type
                `new-${this.skillType}-skill-title`, // Id
                true, // Will be validated
                '', // Value
                'Enter a skill' // Placeholder
            );
        }

        const skillInput = skillInputGroup.querySelector('input');
        await this.validator.addValidationToInputField(
            skillInput, 'minLength', '2', 'Enter a skill with at least 2 characters'
        );
        await this.validator.addValidationToInputField(
            skillInput, 'maxLength', '64', 'The skill can be a maximum of 64 characters'
        );
        await this.validator.addValidationToInputField(
            skillInput, 'required', true, 'A skill is required', 'Skill'
        );
        this.module.append(skillInputGroup);

        // // Create input group for skill order and add to form
        let orderInputGroup: HTMLParagraphElement;
        if (this.isEditMode) {
            orderInputGroup = await this.returnInputGroup(
                'Order', // Label
                'number', // Type
                `skill-order-${this.id}`, // Id
                true, // Will be validated
                this.order.toString() // Value
            );
        } else {
            orderInputGroup = await this.returnInputGroup(
                'Order', // Label
                'number', // Type
                `new-${this.skillType}-skill-order`, // Id
                true, // Will be validated
                '0' // Value
            );
        }
        const orderInput = orderInputGroup.querySelector('input');
        await this.validator.addValidationToInputField(
            orderInput, 'min', '0', 'Order needs to be at least 0'
        );
        await this.validator.addValidationToInputField(
            orderInput, 'required', true, 'Order is required', 'Order'
        );
        this.module.append(orderInputGroup);

        // Create buttons group and add to form
        let buttonsGroup: HTMLParagraphElement;
        if (this.isEditMode) {
            buttonsGroup = await this.returnButtonsGroup(true);
        } else {
            buttonsGroup = await this.returnButtonsGroup(false);
        }
        this.module.append(buttonsGroup);

        await this.handleSubmit(skillInput, orderInput);

        return this.module;
    }

    async handleSubmit(skillInput: HTMLInputElement, orderInput: HTMLInputElement): Promise<void> {
        this.module.addEventListener('submit', async e => {
            e.preventDefault();

            if (!await this.validator.validateInputField(skillInput)) return;
            if (!await this.validator.validateInputField(orderInput)) return;

            this.title = skillInput.value;
            this.order = parseInt(orderInput.value);

            const skill = {
                title: this.title,
                type: this.skillType,
                order: this.order
            }

            if (this.isEditMode) {
                await this.updateSkill(skill);
            } else {
                await this.createSkill(skill);
            }
        });
    }

    async createSkill(skill: ISkillFillable): Promise<void> {
        const app = new App();
        let createdSkill = await this.model.create(skill);

        if (createdSkill.hasOwnProperty('error')) {
            await app.writeMessage('error', (createdSkill as IError).error);
            return;
        }

        this.id = (createdSkill as ISkill).id;
        this.title = (createdSkill as ISkill).title;
        this.order = (createdSkill as ISkill).order;

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

        const fields = this.module.querySelectorAll('input');
        fields.forEach(field => {
            field.value = '';
        })

        await app.writeMessage('success', `The ${this.objectType.toLowerCase()} was successfully added.`);
    }

    async updateSkill(skill: ISkillFillable): Promise<void> {
        console.log('we are gonna update');
    }
}
