import Article from "../Article";
import IModule from "../../../interfaces/IModule";
import IUser from "../../../interfaces/IUser";

/**
 * Work experience article module.
 * 
 * @author: Sofie Wallin
 */
export default class WorkExperienceArticle extends Article implements IModule {
    readonly role: string;
    readonly workplace: string;
    readonly workplaceWebsite: string;
    readonly startDate: string;
    readonly endDate: string;

    constructor(
        apiUrl: string, 
        user: IUser, 
        id: number, 
        role: string, 
        workplace: string, 
        workplaceWebsite: string,
        startDate: string,
        endDate: string,
        order: number
    ) {
        super(apiUrl, user, id, order);

        this.role = role;
        this.workplace = workplace;
        this.workplaceWebsite = workplaceWebsite;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create article and set as module
        const article = await this.createArticle(['work-experience']);
        this.module = article;

        // Create group for role and add to article
        const roleGroup = await this.createPropertyInfo('Role', this.role, ['work-experience-role']);
        this.module.append(roleGroup);

        // Create group for workplace and add to article
        let workplace: string;
        if (this.workplace) {
            workplace = this.workplace;
        } else {
            workplace = '<em>Add a workplace</em>'
        }
        const workplaceGroup = await this.createPropertyInfo('Workplace', workplace, ['work-experience-workplace']);
        this.module.append(workplaceGroup);
        
        // Create group for workplace website and add to article
        let workplaceWebsite: string;
        if (this.workplaceWebsite) {
            workplaceWebsite = this.workplaceWebsite;
        } else {
            workplaceWebsite = '<em>Add a website</em>';
        }
        const workplaceWebsiteGroup = await this.createPropertyInfo('Workplace website', workplaceWebsite, ['work-experience-workplace-website']);
        this.module.append(workplaceWebsiteGroup);

        // Create group for start date and add to article
        const startDateGroup = await this.createPropertyInfo('Start date', this.startDate, ['work-experience-start-date']);
        this.module.append(startDateGroup);

        // Create group for end date and add to article
        let endDate: string;
        if (this.endDate) {
            endDate = this.endDate;
        } else {
            endDate = 'Present';
        }
        const endDateGroup = await this.createPropertyInfo('End date', endDate, ['work-experience-end-date']);
        this.module.append(endDateGroup);

        // Create group for order and add to article
        const orderGroup = await this.createPropertyInfo('Order', this.order.toString(), ['work-experience-order']);
        this.module.append(orderGroup);

        // Create edit button and add to article
        const editButton = await this.createEditButton();
        this.module.append(editButton);

        // Add event listener to edit button
        await this.handleEditClick(editButton);

        return this.module;
    }
}
