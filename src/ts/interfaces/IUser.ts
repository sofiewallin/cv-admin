/**
 * User interface.
 * 
 * @author: Sofie Wallin
 */
export default interface IUser {
    user: {
        id: number,
        username: string,
        created_at: Date,
        updated_at: Date
    },
    token: string
}
