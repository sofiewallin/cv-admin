import Article from "../Article";
import IModule from "../../../interfaces/IModule";
import IUser from "../../../interfaces/IUser";

/**
 * Skills article module.
 * 
 * @author: Sofie Wallin
 */
export default class SkillArticle extends Article implements IModule {
    readonly title: string;
    readonly order: number;

    constructor(apiUrl: string, user: IUser, id?: number, title?: string, order?: number) {
        super(apiUrl, user, id);

        this.title = title;
        this.order = order;
    }

    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create article and set as module
        const article = await this.createArticle('skill');
        this.module = article;
        
        // Create group for skill title and add to article
        const skillGroup = await this.createPropertyInfo('Skill', this.title, ['skill-title']);
        this.module.append(skillGroup);

        // Create group for skill order and add to article
        const orderGroup = await this.createPropertyInfo('Order', this.order.toString(), ['skill-order']);
        this.module.append(orderGroup);

        // Create edit button and add to article
        const editButton = await this.createButton(
            'Edit',
            false,
            ['edit-button']
        );
        editButton.setAttribute('aria-controls', `skill-edit-form-${this.id}`);
        editButton.setAttribute('aria-expanded', 'false');
        this.module.append(editButton);
        
        // Add event listener to edit button
        await this.handleEditClick(editButton);

        return this.module;
    }
}
