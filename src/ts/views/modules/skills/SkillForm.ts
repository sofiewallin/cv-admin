import Module from "../Module";
import IModule from "../../../interfaces/IModule";
import IUser from "../../../interfaces/IUser";

export default class SkillForm extends Module implements IModule  {
    // Properties
    readonly isHidden: boolean;
    readonly id: number;
    readonly title: string;
    readonly order: number;

    /**
     * Constructor
     */
    constructor(apiUrl: string, user: IUser, isHidden: boolean, id?: number, title?: string, order?: number) {
        super(apiUrl, user);

        this.isHidden = isHidden;
        this.id = id;
        this.title = title;
        this.order = order;
    }

    /**
     * Return module.
     */
    async return(): Promise<HTMLElement> {
        const form = document.createElement('form') as HTMLFormElement;
        if (this.isHidden) { 
            form.classList.add('edit-form', 'hidden');
        } else {
            form.classList.add('add-form');
        }

        this.module = form;

        return this.module;
    }
}