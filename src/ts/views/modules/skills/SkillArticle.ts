import Module from "../Module";
import IModule from "../../../interfaces/IModule";
import IUser from "../../../interfaces/IUser";

export default class SkillArticle extends Module implements IModule {
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
        const article = document.createElement('article') as HTMLElement;

        this.module = article;
        
        return this.module;
    }
}