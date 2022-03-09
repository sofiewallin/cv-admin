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
    readonly startDate: Date;
    readonly endDate: Date;
    readonly type: string;

    constructor(
        apiUrl: string, 
        user: IUser, 
        id: number, 
        name: string, 
        degree: string, 
        institution: string, 
        institutionWebsite: string,
        startDate: Date,
        endDate: Date,
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
        const article = await this.createArticle(['education', `education-${this.type.toLowerCase()}`]);
        this.module = article;

        return this.module;
    }
}
