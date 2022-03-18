import View from "./View";
import IView from "../interfaces/IView";
import IUser from "../interfaces/IUser";
import Navigation from "./modules/Navigation";
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
    readonly topBar: HTMLElement;
    readonly bottomBar: HTMLElement;

    constructor(apiUrl: string, user: IUser, appContent: HTMLElement) {
        super(apiUrl, user, appContent);

        this.topBar = document.querySelector('.top-bar') as HTMLElement;
        this.bottomBar = document.querySelector('.bottom-bar') as HTMLElement;
    }

    /**
     * Render view.
     * 
     * Appends multiple modules to the view.
     */
    async render(): Promise<void> {
        // Add navigation module in header
        await this.appendModule(new Navigation(this.apiUrl, this.user), this.topBar);

        // Add projects section module in app content container
        await this.appendModule(new ProjectSection(this.apiUrl, this.user), this.appContent);

        // Add skills section module in app content container
        await this.appendModule(new SkillsSection(this.apiUrl, this.user), this.appContent);

        // Add experience section module in app content container
        await this.appendModule(new ExperienceSection(this.apiUrl, this.user), this.appContent);

        // Add back to top link module in footer
        await this.appendModule(new BackToTopLink(), this.bottomBar);
    }
}
