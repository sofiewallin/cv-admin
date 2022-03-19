import App from "../../../App";
import Module from "../Module";
import Skill from "../../../models/Skill";
import IModule from "../../../interfaces/IModule";
import ISkill from "../../../interfaces/skill/ISkill";
import IError from "../../../interfaces/IError";
import SkillArticle from "./SkillArticle";
import SkillForm from "./SkillForm";

/**
 * Skills section module.
 * 
 * @author: Sofie Wallin
 */
export default class SkillsSection extends Module implements IModule {
    private skills: ISkill[] = [];

    /**
     * Get all skills from API.
     */
    async getSkills(): Promise<ISkill[]> {
        // Get all skills in model
        const skillModel = new Skill(this.apiUrl, this.user);
        let skills = await skillModel.readAll();

        // Write error if there is one
        if (!Array.isArray(skills)) {
            const app = new App();
            await app.writeMessage('error', (skills as IError).error);  
            return;
        }

        return skills as ISkill[];
    }

    /**
     * Create module.
     */
    async create(): Promise<HTMLElement> {
        // Create section and set as module
        const section = await this.createSection('skills');
        this.module = section;

        // Create section heading and add to section
        const heading = await this.createHeading(2, 'Skills', ['heading', 'big-heading']);
        this.module.append(heading);

        // Create show skills button and add to heading
        const showSkillsButton = await this.createButton(
            '<span class="hidden-visually">Show skills</span>', 
            false, 
            ['show-objects']
        );
        heading.append(showSkillsButton);

        // Create skills container and add to section
        const skillsDiv = await this.createDiv(['hidden'], 'skills-container');
        this.module.append(skillsDiv);

        // Get all skills
        this.skills = await this.getSkills();
        
        // Create professional skills list and add to skills container
        const professionalSkills = await this.createSkillList('Professional', skillsDiv);
        skillsDiv.append(professionalSkills);

        // Create technical skills list and add to skills container
        const technicalSkills = await this.createSkillList('Technical', skillsDiv);
        skillsDiv.append(technicalSkills);

        // Create personal skills list and add to skills container
        const personalSkills = await this.createSkillList('Personal', skillsDiv);
        skillsDiv.append(personalSkills);

        // Create lingual skills list and add to skills container
        const lingualSkills = await this.createSkillList('Lingual', skillsDiv);
        skillsDiv.append(lingualSkills);

        // Set show skills button to toggle skills list
        await this.setVisibilityToggle(showSkillsButton, skillsDiv, 'skills');

        return this.module;
    }

    /**
     * Create list of skills.
     * 
     * Creates a list of skills based on type.
     */
    async createSkillList(skillType: string, container: HTMLDivElement): Promise<HTMLUListElement> {
        // Create heading
        const heading = await this.createHeading(3, skillType, ['heading', 'medium-heading']);
        container.append(heading);

        // Filter skills and create ul list
        const filteredSkills = this.skills.filter(skill => skill.type === skillType);
        const skillListItems = await this.createSkillListItems(filteredSkills, skillType);
        const skillList = await this.createUlList(`${skillType.toLowerCase()}-skill-list`, skillListItems, ['object-list']);
        
        return skillList;
    }

    /**
     * Create skill list items.
     * 
     * Creates an article and a form for each skill and adds it
     * to a list item. Also creates a form for adding new skills
     * in a list item and adds it at the bottom of the list.
     */
    async createSkillListItems(skills: ISkill[], skillType: string): Promise<HTMLLIElement[]> {
        let listItems: HTMLLIElement[] = [];

        /* Maps list of skills and adds a skill 
        article module and a skill form module */
        const result = skills.map(async skill => {
            // Create list item
            const listItem = document.createElement('li') as HTMLLIElement;
            listItem.classList.add('skill', 'object', 'white');
            listItem.id = `skill-${skill.id}`;

            // Add skill article module
            await this.appendModule(
                new SkillArticle(
                    this.apiUrl,
                    this.user,
                    skill.id, 
                    skill.title, 
                    skill.order
                ), listItem
            );
            
            // Add skill form module
            await this.appendModule(
                new SkillForm(
                    this.apiUrl, 
                    this.user, 
                    true,
                    'Skill',
                    skillType,
                    skill.id, 
                    skill.title, 
                    skill.order
                ), listItem
            );
            
            // Add list item to list
            listItems.push(listItem);
        });
        await Promise.all(result);

        // Create a list item with a form for adding new skills
        const newSkillFormListItem = document.createElement('li') as HTMLLIElement;
        newSkillFormListItem.classList.add('new-skill', 'object', 'white');
        await this.appendModule(
            new SkillForm(this.apiUrl, this.user, false, 'Skill', skillType), 
            newSkillFormListItem
        );

        // Add list item to list
        listItems.push(newSkillFormListItem);

        return listItems;
    }
}
