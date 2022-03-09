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

    constructor(apiUrl: string, user: IUser, id: number, title: string, order: number) {
        super(apiUrl, user, id, order);

        this.title = title;
    }

    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create article and set as module
        const article = await this.createArticle(['skill']);
        this.module = article;
        
        // Create group for title and add to article
        const skillGroup = await this.createPropertyInfo('Skill', this.title, ['skill-title']);
        this.module.append(skillGroup);

        // Create group for order and add to article
        const orderGroup = await this.createPropertyInfo('Order', this.order.toString(), ['skill-order']);
        this.module.append(orderGroup);

        // Create edit button and add to article
        const editButton = await this.createEditButton();
        this.module.append(editButton);
        
        // Add event listener to edit button
        await this.handleEditClick(editButton);

        return this.module;
    }
}
