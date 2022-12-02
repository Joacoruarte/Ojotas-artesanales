
import Users from "../../repositories/user.repository";


export default async function users(req , res){
    const users = new Users()
    switch(req.method){
        case "GET":
            users.getUsers(res)
            break;
        case "POST":
            users.createUser(req , res)
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}