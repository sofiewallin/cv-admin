// Interfaces
import IModule from "../interfaces/IModule";
import IUser from "../interfaces/IUser";

// Modules
import Navigation from "./modules/Navigation";
import LogoutButton from "./modules/LogoutButton";
import ProjectSection from "./modules/projects/ProjectsSection";
import SkillsSection from "./modules/skills/SkillsSection";
import ExperienceSection from "./modules/experience/ExperienceSection";
import BackToTopLink from "./modules/BackToTopLink";

/**
 * Home View.
 * 
 * @author: Sofie Wallin
 */
export default class HomeView {

    // Properties
    public apiUrl: string;
    public user: IUser;
    public mainHeader: HTMLElement;
    public appRoot: HTMLElement;
    public mainFooter: HTMLElement;

    /**
     * Constructor
     */
    constructor(user: IUser, apiUrl: string, appRoot: HTMLElement) {
        this.apiUrl = apiUrl;
        this.user = user;
        this.mainHeader = document.querySelector('#main-header') as HTMLElement;
        this.appRoot = appRoot;
        this.mainFooter = document.querySelector('#main-footer') as HTMLElement;
    }

    /**
     * Render view.
     */
    async render(): Promise<void> {
        // Create logout button module and add it to header
        await this.appendModule(new Navigation(), this.mainHeader);

        // Create log out button module and add it to header
        await this.appendModule(new LogoutButton(this.apiUrl, this.user), this.mainHeader);

        // Create hidden h1 heading for home view
        const heading = document.createElement('h1') as HTMLHeadingElement;
        heading.innerHTML = '<span class="hidden-visually">Administration</span>';
        this.appRoot.append(heading);

        // Create projects section and add it to content
        await this.appendModule(new ProjectSection(this.apiUrl, this.user), this.mainHeader);

        // Create skills section and add it to content
        await this.appendModule(new SkillsSection(this.apiUrl, this.user), this.mainHeader);

        // Create experience section and add it to content
        await this.appendModule(new ExperienceSection(this.apiUrl, this.user), this.mainHeader);

        // Create log out button module and add it to header
        await this.appendModule(new BackToTopLink(), this.mainFooter);
    }

    /**
     * Append module to view.
     */
    async appendModule(module: IModule, element: HTMLElement): Promise<void> {
        const createdModule = await module.create();
        element.append(createdModule);
    }
}
