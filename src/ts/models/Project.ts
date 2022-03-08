import Model from "./Model";
import IModel from "../interfaces/IModel";
import IProject from "../interfaces/project/IProject";
import IProjectFillable from "../interfaces/project/IProjectFillable";
import IError from "../interfaces/IError";

export default class Project extends Model implements IModel {
    /**
     * Create project in API.
     */
    async create(project: IProjectFillable): Promise<IProject|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.user.token}`
                },
                body: JSON.stringify(project)
            });
        
            const createdProject = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when creating project. Try again.');
            }

            return createdProject;

        } catch (error) {
            return { error: error.message };
        }
    }

    /**
     * Read all projects from API.
     */
    async readAll(): Promise<IProject[]|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/projects`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.user.token}`
                }
            });
        
            const projects = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when fetching projects. Try again by reloading page.');
            }
 
            return projects;

        } catch (error) {
            return { error: error.message };
        }
    }

    /**
     * Update one project by id in API.
     */
    async update(id: number, project: IProjectFillable): Promise<IProject|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/projects/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.user.token}`
                },
                body: JSON.stringify(project)
            });
        
            const updatedProject = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when updating project. Try again.');
            }

            return updatedProject;

        } catch (error) {
            return { error: error.message };
        }
    }

    /**
     * Delete one project by id in API.
     */
    async delete(id: number): Promise<IProject|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.user.token}`
                }
            });
        
            const deletedProject = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when deleting project. Try again.');
            }

            return deletedProject;

        } catch (error) {
            return { error: error.message };
        }
    }
}
