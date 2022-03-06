import Model from "./Model";
import IWorkExperience from "../interfaces/IWorkExperience";
import IError from "../interfaces/IError";
import IModel from "../interfaces/IModel";

export default class WorkExperience extends Model implements IModel {
    /**
     * Create work experience in API.
     */
    async create(workExperience: IWorkExperience): Promise<IWorkExperience|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/work-experiences`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.user.token}`
                },
                body: JSON.stringify(workExperience)
            });
        
            const createdWorkExperience = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when creating work experience. Try again.');
            }

            return createdWorkExperience;

        } catch (error) {
            return { error: error.message };
        }
    }

    /**
     * Read all work experiences from API.
     */
    async readAll(): Promise<IWorkExperience[]|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/work-experiences`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.user.token}`
                }
            });
        
            const workExperiences = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when fetching work experiences. Try again by reloading page.');
            }
 
            return workExperiences;

        } catch (error) {
            return { error: error.message };
        }
    }

    /**
     * Update one work experience by id in API.
     */
    async update(id: number, workExperience: IWorkExperience): Promise<IWorkExperience|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/work-experiences/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.user.token}`
                },
                body: JSON.stringify(workExperience)
            });
        
            const updatedWorkExperience = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when updating work experience. Try again.');
            }

            return updatedWorkExperience;

        } catch (error) {
            return { error: error.message };
        }
    }

    /**
     * Delete one work experience by id in API.
     */
    async delete(id: number): Promise<IWorkExperience|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/work-experiences/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.user.token}`
                }
            });
        
            const deletedWorkExperience = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when deleting work experience. Try again.');
            }

            return deletedWorkExperience;

        } catch (error) {
            return { error: error.message };
        }
    }
}
