import Article from "../Article";
import IModule from "../../../interfaces/IModule";
import IUser from "../../../interfaces/IUser";

/**
 * Project article module.
 * 
 * @author: Sofie Wallin
 */
export default class ProjectArticle extends Article implements IModule {
    readonly title: string;
    readonly website: string;
    readonly description: string;
    readonly logo: string;
    readonly type: string;

    constructor(
        apiUrl: string, 
        user: IUser, 
        id: number, 
        title: string, 
        website: string, 
        description: string,
        logo: string,
        type: string,
        order: number
    ) {
        super(apiUrl, user, id, order);

        this.title = title;
        this.website = website;
        this.description = description;
        this.logo = logo;
        this.type = type;
    }

    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create article and set as module
        const article = await this.createArticle();
        this.module = article;

        // Create group for logo and add to article
        const logoGroup = await this.createDiv(['logo-container']);
        this.module.append(logoGroup);

        const logoLabel = await this.createHeading(4, 'Logo', ['label']);
        logoGroup.append(logoLabel);

        const logoFigure = document.createElement('figure') as HTMLElement;
        logoFigure.classList.add('logo');
        logoGroup.append(logoFigure);

        const baseUrl = this.apiUrl.replace('/api', '');
        const logo = document.createElement('img') as HTMLImageElement;
        logo.alt = `${this.title} logo`;
        logo.src = `${baseUrl}/storage/uploads/${this.logo}`;
        logoFigure.append(logo);

        // Create group for title and add to article
        const titleGroup = await this.createPropertyInfo('Title', this.title, ['field', 'title-field']);
        this.module.append(titleGroup);

        // Create group for type and add to article
        const typeGroup = await this.createPropertyInfo('Type', this.type, ['field', 'type-field']);
        this.module.append(typeGroup);

        // Create group for website and add to article
        let website: string;
        if (this.website) {
            website = this.website;
        } else {
            website = '<em>Add a website</em>';
        }
        const websiteGroup = await this.createPropertyInfo('Website', website, ['field', 'url-field', 'website-field']);
        this.module.append(websiteGroup);

        // Create group for description and add to article
        let description: string;
        if (this.description) {
            description = this.description;
        } else {
            description = '<em>Add a description</em>'
        }
        const descriptionGroup = await this.createPropertyInfo('Description', description, ['field', 'description-field']);
        this.module.append(descriptionGroup);

        // Create group for order and add to article
        const orderGroup = await this.createPropertyInfo('Order', this.order.toString(), ['field', 'order-field']);
        this.module.append(orderGroup);

        // Create buttons container and add to article
        const buttonsContainer = await this.createDiv(['buttons-container']);
        this.module.append(buttonsContainer);

        // Create edit button and add to buttons container
        const editButton = await this.createEditButton('project');
        buttonsContainer.append(editButton);

        // Add event listener to edit button
        await this.handleEditClick(editButton);

        return this.module;
    }
}
