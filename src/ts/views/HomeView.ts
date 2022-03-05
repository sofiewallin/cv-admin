import View from "./View";

import IUser from "../interfaces/IUser";

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
export default class HomeView extends View {
    // Properties
    public user: IUser;
    public mainHeader: HTMLElement;
    public mainFooter: HTMLElement;

    /**
     * Constructor
     */
    constructor(apiUrl: string, user: IUser, appRoot: HTMLElement) {
        super(apiUrl, appRoot);

        this.user = user;
        this.mainHeader = document.querySelector('#main-header') as HTMLElement;
        this.mainFooter = document.querySelector('#main-footer') as HTMLElement;
    }

    /**
     * Render view.
     * 
     * Appends multiple modules to the view.
     */
    async render(): Promise<void> {
        // Navigation in header
        await this.appendModule(new Navigation(), this.mainHeader);

        // Log out button in header
        await this.appendModule(new LogoutButton(this.apiUrl, this.user), this.mainHeader);

        // Heading
        const heading = document.createElement('h1') as HTMLHeadingElement;
        heading.innerHTML = '<span class="hidden-visually">Administration</span>';
        this.appRoot.append(heading);

        // Projects section
        await this.appendModule(new ProjectSection(this.apiUrl, this.user), this.appRoot);

        // Skills section
        await this.appendModule(new SkillsSection(this.apiUrl, this.user), this.appRoot);

        // Experience section
        await this.appendModule(new ExperienceSection(this.apiUrl, this.user), this.appRoot);

        // Back to top link in footer
        await this.appendModule(new BackToTopLink(), this.mainFooter);
    }
}
