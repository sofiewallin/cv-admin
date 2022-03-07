import Form from "../Form";
import IModule from "../../../interfaces/IModule";
import IUser from "../../../interfaces/IUser";

export default class SkillForm extends Form implements IModule  {
    // Properties
    readonly id: number;
    readonly title: string;
    readonly order: number;
    readonly type: string;

    /**
     * Constructor
     */
    constructor(apiUrl: string, user: IUser, isEditMode: boolean, type: string, id?: number, title?: string, order?: number) {
        super(apiUrl, user, isEditMode);

        this.type = type;
        this.id = id;
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
                'Skill', 
                'text', 
                `skill-title-${this.id}`, 
                true, 
                true, 
                this.title, 
                'Enter a skill'
            );
        } else {
            skillInputGroup = await this.returnInputGroup(
                'Skill', 
                'text', 
                `new-${this.type}-skill-title`, 
                true, 
                true, 
                '', 
                'Enter a skill'
            );
        }
        this.module.append(skillInputGroup);

        // // Create input group for skill order and add to form
        let orderInputGroup: HTMLParagraphElement;
        if (this.isEditMode) {
            orderInputGroup = await this.returnInputGroup(
                'Order', 
                'number', 
                `skill-order-${this.id}`, 
                true, 
                true, 
                this.order.toString()
            );
        } else {
            orderInputGroup = await this.returnInputGroup(
                'Order', 
                'number', 
                `new-${this.type}-skill-order`, 
                true, 
                true, 
                '0'
            );
        }
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