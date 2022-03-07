import Form from "../Form";
import IModule from "../../../interfaces/IModule";
import IUser from "../../../interfaces/IUser";
import Validator from "../../../Validator";

export default class SkillForm extends Form implements IModule  {
    // Properties
    readonly title: string;
    readonly order: number;
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

        const validator = new Validator();

        // Create input group for skill title and add to form
        let skillInputGroup: HTMLParagraphElement;
        if (this.isEditMode) {
            skillInputGroup = await this.returnInputGroup(
                'Skill',
                'text',
                `skill-title-${this.id}`,
                true,
                this.title,
                'Enter a skill'
            );
        } else {
            skillInputGroup = await this.returnInputGroup(
                'Skill',
                'text',
                `new-${this.skillType}-skill-title`,
                true,
                '',
                'Enter a skill'
            );
        }

        const skillInput = skillInputGroup.querySelector('input');
        await validator.addValidationToInputField(
            skillInput, 'minLength', '2', 'Enter a skill with at least 2 characters'
        );
        await validator.addValidationToInputField(
            skillInput, 'maxLength', '64', 'The skill can be a maximum of 64 characters'
        );
        await validator.addValidationToInputField(
            skillInput, 'required', true, 'A skill is required', 'Skill'
        );
        this.module.append(skillInputGroup);

        // // Create input group for skill order and add to form
        let orderInputGroup: HTMLParagraphElement;
        if (this.isEditMode) {
            orderInputGroup = await this.returnInputGroup(
                'Order',
                'number',
                `skill-order-${this.id}`,
                true,
                this.order.toString()
            );
        } else {
            orderInputGroup = await this.returnInputGroup(
                'Order',
                'number',
                `new-${this.skillType}-skill-order`,
                true,
                '0'
            );
        }
        const orderInput = orderInputGroup.querySelector('input');
        await validator.addValidationToInputField(
            orderInput, 'min', '0', 'Order needs to be at least 0'
        );
        await validator.addValidationToInputField(
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

        return this.module;
    }
}
