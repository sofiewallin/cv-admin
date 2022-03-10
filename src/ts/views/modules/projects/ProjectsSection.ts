import App from "../../../App";
import Module from "../Module";
import Project from "../../../models/Project";
import IModule from "../../../interfaces/IModule";
import IProject from "../../../interfaces/IProject";
import IError from "../../../interfaces/IError";
import ProjectArticle from "./ProjectArticle";
import ProjectForm from "./ProjectForm";

/**
 * Projects section module.
 * 
 * @author: Sofie Wallin
 */
export default class ProjectsSection extends Module implements IModule {
    private projects: IProject[];

    /**
     * Get all projects from API.
     */
    async getProjects(): Promise<IProject[]> {
        // Get all projects in model
        const projectModel = new Project(this.apiUrl, this.user);
        let projects = await projectModel.readAll();

        // Write error if there is one
        if (!Array.isArray(projects)) {
            const app = new App();
            await app.writeMessage('error', (projects as IError).error);  
            return;
        }

        return projects as IProject[];
    }

    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create section and set as module
        const section = await this.createSection('projects');
        this.module = section;

        // Create section heading and add to section
        const heading = await this.createHeading(2, 'Projects');
        this.module.append(heading);

        // Create show projects button and add to heading
        const showProjectsButton = await this.createButton(
            '<span class="hidden-visually">Show projects</span>', 
            false, 
            ['show-objects']
        );
        heading.append(showProjectsButton);

        // Create projects container and add to section
        const projectsDiv = await this.createDiv(['hidden'], 'projects-container');
        this.module.append(projectsDiv);

        // Get all projects
        this.projects = await this.getProjects();

        // Create project list and add to projects container
        const projects = await this.createProjectList(projectsDiv);
        projectsDiv.append(projects);

        // Set show projects button to toggle projects list
        await this.setVisibilityToggle(showProjectsButton, projectsDiv, 'projects');

        return this.module;
    }

    /**
     * Create list of projects.
     * 
     * Creates a list of projects based on type.
     */
    async createProjectList(container: HTMLDivElement): Promise<HTMLUListElement> {
        // Create heading
        const heading = await this.createHeading(3, 'Projects');
        container.append(heading);

        // Create ul list
        const projectListItems = await this.createProjectListItems();
        const projectList = await this.createUlList('projects', projectListItems);
        
        return projectList;
    }

    /**
     * Create project list items.
     * 
     * Creates an article and a form for each project and adds it
     * to a list item. Also creates a form for adding new projects
     * in a list item and adds it at the bottom of the list.
     */
    async createProjectListItems(): Promise<HTMLLIElement[]> {
        let listItems: HTMLLIElement[] = [];

        /* Maps list of projects and adds a project 
        article module and a project form module */
        if (this.projects.length > 0) {
            const result = this.projects.map(async project => {
                // Create list item
                const listItem = document.createElement('li') as HTMLLIElement;
                listItem.id = `project-${project.id}`;

                // Add project article module
                await this.appendModule(
                    new ProjectArticle(
                        this.apiUrl,
                        this.user,
                        project.id, 
                        project.title, 
                        project.website,
                        project.description,
                        project.logo,
                        project.type,
                        project.order
                    ), listItem
                );
                
                // Add project form module
                await this.appendModule(
                    new ProjectForm(
                        this.apiUrl, 
                        this.user, 
                        true,
                        'Project',
                        project.id, 
                        project.title, 
                        project.website,
                        project.description,
                        project.logo,
                        project.type,
                        project.order
                    ), listItem
                );
                
                // Add list item to list
                listItems.push(listItem);
            });
            await Promise.all(result);
        }

        // Create a list item with a form for adding new projects
        const newProjectFormListItem = document.createElement('li') as HTMLLIElement;
        newProjectFormListItem.classList.add('new-project');
        await this.appendModule(
            new ProjectForm(this.apiUrl, this.user, false, 'Project'), 
            newProjectFormListItem
        );

        // Add list item to list
        listItems.push(newProjectFormListItem);

        return listItems;
    }
}
