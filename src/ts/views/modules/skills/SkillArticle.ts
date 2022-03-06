import Article from "../Article";
import IModule from "../../../interfaces/IModule";
import IUser from "../../../interfaces/IUser";
import SkillForm from "./SkillForm";

export default class SkillArticle extends Article implements IModule {
    // Properties
    readonly id: number;
    readonly title: string;
    readonly order: number;

    /**
     * Constructor
     */
    constructor(apiUrl: string, user: IUser, id?: number, title?: string, order?: number) {
        super(apiUrl, user);

        this.id = id;
        this.title = title;
        this.order = order;
    }

    /**
     * Return module.
     */
    async return(): Promise<HTMLElement> {
        // Create article and set as module
        const article = await this.returnArticle('skill');
        this.module = article;
        
        // Create div for skill title and add to article
        const skillGroup = await this.returnPropertyInfo('Skill', this.title.toString(), ['skill-title'])
        this.module.append(skillGroup);

        // Create div for skill order and add to article
        const orderGroup = await this.returnPropertyInfo('Order', this.order.toString(), ['skill-order'])
        this.module.append(orderGroup);

        // Create button
        const editButton = await this.returnButton(
            'Edit<span class="hidden-visually"> skill</span>',
            false,
            ['edit-button']
        );
        await this.handleEditClick(editButton);
        this.module.append(editButton);

        return this.module;
    }
}