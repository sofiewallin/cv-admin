import App from "../../../App";
import Module from "../Module";
import WorkExperience from "../../../models/WorkExperience";
import Education from "../../../models/Education";
import IModule from "../../../interfaces/IModule";
import IWorkExperience from "../../../interfaces/work-experience/IWorkExperience";
import IEducation from "../../../interfaces/education/IEducation";
import IError from "../../../interfaces/IError";
import WorkExperienceArticle from "./WorkExperienceArticle";
import WorkExperienceForm from "./WorkExperienceForm";
import EducationArticle from "./EducationArticle";
import EducationForm from "./EducationForm";

/**
 * Experience section module.
 * 
 * @author: Sofie Wallin
 */
export default class ExperienceSection extends Module implements IModule {
    private workExperiences: IWorkExperience[];
    private education: IEducation[];

    /**
     * Get all work experiences from API.
     */
     async getWorkExperiences(): Promise<IWorkExperience[]> {
        // Get all work experiences in model
        const workExperienceModel = new WorkExperience(this.apiUrl, this.user);
        let workExperiences = await workExperienceModel.readAll();

        // Write error if there is one
        if (!Array.isArray(workExperiences)) {
            const app = new App();
            await app.writeMessage('error', (workExperiences as IError).error);  
            return;
        }

        return (workExperiences as IWorkExperience[]);
    }

    /**
     * Get all education from API.
     */
     async getEducation(): Promise<IEducation[]> {
        // Get all education in model
        const educationModel = new Education(this.apiUrl, this.user);
        let education = await educationModel.readAll();

        // Write error if there is one
        if (!Array.isArray(education)) {
            const app = new App();
            await app.writeMessage('error', (education as IError).error);  
            return;
        }

        return (education as IEducation[]);
    }

    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create section and set as module
        const section = await this.createSection('experience');
        this.module = section;

        // Create section heading and add to section
        const heading = await this.createHeading(2, 'Skills');
        this.module.append(heading);

        // Create show experience button and add to heading
        const showExperienceButton = await this.createButton(
            '<span class="hidden-visually">Show experience</span>', 
            false, 
            ['show-objects']
        );
        heading.append(showExperienceButton);

        // Create experiences container and add to section
        const experiencesDiv = await this.createDiv(['hidden'], 'experience-container');
        this.module.append(experiencesDiv);

        // Get all work experiences
        this.workExperiences = await this.getWorkExperiences();

        // Create work experiences list and add to experiences container
        const workExperiences = await this.createList('Work', experiencesDiv);
        experiencesDiv.append(workExperiences);

        // Get all education
        this.education = await this.getEducation();

        const educationPrograms = await this.createList('Education programs', experiencesDiv);
        experiencesDiv.append(educationPrograms);

        const courses = await this.createList('Courses', experiencesDiv);
        experiencesDiv.append(courses);

        // Here goes listing of education...

        // Set show experience button to toggle experiences list
        await this.setVisibilityToggle(showExperienceButton, experiencesDiv, 'experiences');

        return this.module;
    }

    /**
     * Create list.
     * 
     * Creates a list based on  object type.
     */
     async createList(objectType: string, container: HTMLDivElement): Promise<HTMLUListElement> {
        // Create heading
        const heading = await this.createHeading(3, objectType);
        container.append(heading);

        // Create ul list based on type
        let listId: string;
        let listItems: HTMLLIElement[];
        let filteredEducation: IEducation[];

        if (objectType === 'Work') {
            listId = 'work-experiences';
            listItems = await this.createListItems();
        } else if (objectType === 'Education programs') {
            listId = 'education-programs';
            filteredEducation = this.education.filter(education => education.type === 'Program');
            listItems = await this.createListItems(filteredEducation, 'Program');
        } else {
            listId = 'courses';
            filteredEducation = this.education.filter(education => education.type === 'Course');
            listItems = await this.createListItems(filteredEducation, 'Course');
        }

        const list = await this.createUlList(listId, listItems);
        
        return list;
    }

    /**
     * Create list items.
     * 
     * Creates an article and a form for each work experience/education and adds it
     * to a list item. Also creates a form for adding new work experiences/education
     * in a list item and adds it at the bottom of the list.
     */
     async createListItems(objects?: IEducation[], educationType?: string): Promise<HTMLLIElement[]> {
        let listItems: HTMLLIElement[] = [];

        if (!objects) {
            if (this.workExperiences.length > 0) {
                const result = this.workExperiences.map(async workExperience => {
                    // Create list item
                    const listItem = document.createElement('li') as HTMLLIElement;
                    listItem.id = `work-experience-${workExperience.id}`;

                    // Add work experience article module
                    await this.appendModule(
                        new WorkExperienceArticle(
                            this.apiUrl,
                            this.user,
                            workExperience.id, 
                            workExperience.role, 
                            workExperience.workplace,
                            workExperience.workplace_website,
                            workExperience.start_date,
                            workExperience.end_date,
                            workExperience.order
                        ), listItem
                    );
                
                // Add work experience form module
                await this.appendModule(
                    new WorkExperienceForm(
                        this.apiUrl, 
                        this.user, 
                        true,
                        'Work experience',
                        workExperience.id, 
                        workExperience.role,
                        workExperience.workplace,
                        workExperience.workplace_website,
                        workExperience.start_date,
                        workExperience.end_date,
                        workExperience.order
                    ), listItem
                );
                
                // Add list item to list
                listItems.push(listItem);
                });
                await Promise.all(result);
            }

            // Create a list item with a form for adding new work experiences
            const newWorkExperienceFormListItem = document.createElement('li') as HTMLLIElement;
            newWorkExperienceFormListItem.classList.add('new-work-experience');
            await this.appendModule(
                new WorkExperienceForm(this.apiUrl, this.user, false, 'Work experience'), 
                newWorkExperienceFormListItem
            );

            // Add list item to list
            listItems.push(newWorkExperienceFormListItem);
        } else {
            if (educationType === 'Program') {
                if (objects.length > 0) {
                    const result = objects.map(async program => {
                        // Create list item
                        const listItem = document.createElement('li') as HTMLLIElement;
                        listItem.id = `education-${program.id}`;
    
                        // Add work experience article module
                        await this.appendModule(
                            new EducationArticle(
                                this.apiUrl,
                                this.user,
                                program.id, 
                                program.name, 
                                program.degree,
                                program.institution,
                                program.institution_website,
                                program.start_date,
                                program.end_date,
                                program.type,
                                program.order
                            ), listItem
                        );

                        // Add work experience form module
                        await this.appendModule(
                            new EducationForm(
                                this.apiUrl, 
                                this.user, 
                                true,
                                'Education',
                                program.type,
                                program.id, 
                                program.name,
                                program.degree,
                                program.institution,
                                program.institution_website,
                                program.start_date,
                                program.end_date,
                                program.order
                            ), listItem
                        );

                        // Add list item to list
                        listItems.push(listItem);
                    });
                    await Promise.all(result);
                }
    
                // Create a list item with a form for adding new education
                const newEducationFormListItem = document.createElement('li') as HTMLLIElement;
                newEducationFormListItem.classList.add('new-education');
                await this.appendModule(
                    new EducationForm(this.apiUrl, this.user, false, 'Education', 'Program'), 
                    newEducationFormListItem
                );
    
                // Add list item to list
                listItems.push(newEducationFormListItem);
            } else {
                if (objects.length > 0) {
                    const result = objects.map(async course => {
                        // Create list item
                        const listItem = document.createElement('li') as HTMLLIElement;
                        listItem.id = `education-${course.id}`;
    
                        // Add work experience article module
                        await this.appendModule(
                            new EducationArticle(
                                this.apiUrl,
                                this.user,
                                course.id, 
                                course.name, 
                                course.degree,
                                course.institution,
                                course.institution_website,
                                course.start_date,
                                course.end_date,
                                course.type,
                                course.order
                            ), listItem
                        );
                    
                        // Add work experience form module
                        await this.appendModule(
                            new EducationForm(
                                this.apiUrl, 
                                this.user, 
                                true,
                                'Education',
                                course.type,
                                course.id, 
                                course.name,
                                course.degree,
                                course.institution,
                                course.institution_website,
                                course.start_date,
                                course.end_date,
                                course.order
                            ), listItem
                        );

                        // Add list item to list
                        listItems.push(listItem);
                    });
                    await Promise.all(result);
                }
    
                // Create a list item with a form for adding new education
                const newEducationFormListItem = document.createElement('li') as HTMLLIElement;
                newEducationFormListItem.classList.add('new-education');
                await this.appendModule(
                    new EducationForm(this.apiUrl, this.user, false, 'Education', 'Course'), 
                    newEducationFormListItem
                );
    
                // Add list item to list
                listItems.push(newEducationFormListItem);
            }
        }

        return listItems;
    }
}
