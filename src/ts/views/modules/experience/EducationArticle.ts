import Article from "../Article";
import IModule from "../../../interfaces/IModule";
import IUser from "../../../interfaces/IUser";

/**
 * Education article module.
 * 
 * @author: Sofie Wallin
 */
export default class EducationArticle extends Article implements IModule {
    readonly name: string;
    readonly degree: string;
    readonly institution: string;
    readonly institutionWebsite: string;
    readonly startDate: string;
    readonly endDate: string;
    readonly type: string;

    constructor(
        apiUrl: string, 
        user: IUser, 
        id: number, 
        name: string, 
        degree: string, 
        institution: string, 
        institutionWebsite: string,
        startDate: string,
        endDate: string,
        type: string,
        order: number
    ) {
        super(apiUrl, user, id, order);

        this.name = name;
        this.degree = degree;
        this.institution = institution;
        this.institutionWebsite = institutionWebsite;
        this.startDate = startDate;
        this.endDate = endDate;
        this.type = type;
    }

    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create article and set as module
        const article = await this.createArticle([`education-${this.type.toLowerCase()}`]);
        this.module = article;

        // Create group for name and add to article
        const nameGroup = await this.createPropertyInfo('Name', this.name, ['field', 'name-field']);
        this.module.append(nameGroup);

        // Create group for degree if program and add to article
        if (this.type === 'Program') {
            let degree: string;
            if (this.degree) {
                degree = this.degree;
            } else {
                degree = '<em>Add a degree</em>'
            }
            const degreeGroup = await this.createPropertyInfo('Degree', degree, ['field', 'degree-field']);
            this.module.append(degreeGroup);
        }
        
        // Create group for institution and add to article
        const institutionGroup = await this.createPropertyInfo('Institution', this.institution, ['field', 'institution-field']);
        this.module.append(institutionGroup);

        // Create group for institution website and add to article
        let institutionWebsite: string;
        if (this.institutionWebsite) {
            institutionWebsite = this.institutionWebsite;
        } else {
            institutionWebsite = '<em>Add a website</em>'
        }
        const institutionWebsiteGroup = await this.createPropertyInfo('Institution website', institutionWebsite, ['field', 'url-field', 'institution-website-field']);
        this.module.append(institutionWebsiteGroup);

        // Create group for start date and add to article
        const startDateGroup = await this.createPropertyInfo('Start date', this.startDate, ['field', 'date-field', 'start-date-field']);
        this.module.append(startDateGroup);

        // Create group for end date and add to article
        let endDate: string;
        if (this.endDate) {
            endDate = this.endDate;
        } else {
            endDate = 'Present'
        }
        const endDateGroup = await this.createPropertyInfo('End date', endDate, ['field', 'date-field', 'end-date-field']);
        this.module.append(endDateGroup);

        // Create group for order and add to article
        const orderGroup = await this.createPropertyInfo('Order', this.order.toString(), ['field', 'order-field']);
        this.module.append(orderGroup);

        // Create buttons container and add to article
        const buttonsContainer = await this.createDiv(['buttons-container']);
        this.module.append(buttonsContainer);

        // Create edit button and add to buttons container
        const editButton = await this.createEditButton();
        buttonsContainer.append(editButton);

        // Add event listener to edit button
        await this.handleEditClick(editButton);

        return this.module;
    }
}
