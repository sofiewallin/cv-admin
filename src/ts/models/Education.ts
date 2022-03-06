import Model from "./Model";
import IEducation from "../interfaces/IEducation";
import IError from "../interfaces/IError";
import IModel from "../interfaces/IModel";

export default class Education extends Model implements IModel {
    /**
     * Create education in API.
     */
    async create(education: IEducation): Promise<IEducation|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/education`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.user.token}`
                },
                body: JSON.stringify(education)
            });
        
            const createdEducation = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when creating education. Try again.');
            }

            return createdEducation;

        } catch (error) {
            return { error: error.message };
        }
    }

    /**
     * Read all education from API.
     */
    async readAll(): Promise<IEducation[]|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/education`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.user.token}`
                }
            });
        
            const education = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when fetching education. Try again by reloading page.');
            }
 
            return education;

        } catch (error) {
            return { error: error.message };
        }
    }

    /**
     * Update one education by id in API.
     */
    async update(id: number, education: IEducation): Promise<IEducation|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/education/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.user.token}`
                },
                body: JSON.stringify(education)
            });
        
            const updatedEducation = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when updating education. Try again.');
            }

            return updatedEducation;

        } catch (error) {
            return { error: error.message };
        }
    }

    /**
     * Delete one education by id in API.
     */
    async delete(id: number): Promise<IEducation|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/education/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.user.token}`
                }
            });
        
            const deletedEducation = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when deleting education. Try again.');
            }

            return deletedEducation;

        } catch (error) {
            return { error: error.message };
        }
    }
}
