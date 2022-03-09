import App from "../../../App";
import Form from "../Form";
import IModule from "../../../interfaces/IModule";
import IUser from "../../../interfaces/IUser";
import IWorkExperienceFillable from "../../../interfaces/work-experience/IWorkExperienceFillable";
import IError from "../../../interfaces/IError";
import IWorkExperience from "../../../interfaces/work-experience/IWorkExperience";
import WorkExperienceArticle from "./WorkExperienceArticle";

/**
 * Skills form module.
 * 
 * @author: Sofie Wallin
 */
export default class WorkExperienceForm extends Form implements IModule  {
    protected role: string;
    protected workplace: string;
    protected workplaceWebsite: string;
    protected startDate: Date;
    protected endDate: Date;

    constructor(
        apiUrl: string, 
        user: IUser, 
        isEditMode: boolean, 
        objectType: string, 
        id?: number, 
        role?: string, 
        workplace?: string,
        workplaceWebsite?: string,
        startDate?: Date,
        endDate?: Date,
        order?: number
    ) {
        super(apiUrl, user, isEditMode, objectType, id, order);

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
        // Create form and set as module
        let form: HTMLFormElement;
        if (this.isEditMode) {
            form = await this.createForm(['edit-form', 'hidden'], `work-experience-edit-form-${this.id}`);
        } else {
            form = await this.createForm(['add-form']);
            form.classList.add('add-form');
        }
        this.module = form;

        return this.module;
    }
}
