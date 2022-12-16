import Users from "../../repositories/user.repository";

export default async function login(req, res) {
    const user = new Users()    
    return user.loginUser(req , res)
}