import View from "./View";
import IView from "../interfaces/IView";
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
 * Renders home view.
 * 
 * @author: Sofie Wallin
 */
export default class HomeView extends View implements IView {
    readonly mainHeader: HTMLElement;
    readonly mainFooter: HTMLElement;

    constructor(apiUrl: string, user: IUser, appContent: HTMLElement) {
        super(apiUrl, user, appContent);

        this.mainHeader = document.querySelector('#main-header') as HTMLElement;
        this.mainFooter = document.querySelector('#main-footer') as HTMLElement;
    }

    /**
     * Render view.
     * 
     * Appends multiple modules to the view.
     */
    async render(): Promise<void> {
        // Add navigation module in header
        await this.appendModule(new Navigation(), this.mainHeader);

        // Add log out button module in header
        await this.appendModule(new LogoutButton(this.apiUrl, this.user), this.mainHeader);

        // Add H1 heading that will be visually hidden
        const heading = document.createElement('h1') as HTMLHeadingElement;
        heading.innerHTML = '<span class="hidden-visually">Administration</span>';
        this.appContent.append(heading);

        // Add projects section module in app content container
        await this.appendModule(new ProjectSection(this.apiUrl, this.user), this.appContent);

        // Add skills section module in app content container
        await this.appendModule(new SkillsSection(this.apiUrl, this.user), this.appContent);

        // Add experience section module in app content container
        await this.appendModule(new ExperienceSection(this.apiUrl, this.user), this.appContent);

        // Add back to top link module in footer
        await this.appendModule(new BackToTopLink(), this.mainFooter);
    }
}
