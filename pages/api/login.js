import Users from "../../repositories/user.repository";


export default async function login(req, res) {
    const user = new Users()    
    switch (req.method) {
        case "POST":
            user.loginUser(req , res)
        break;
        default:
        res.status(400).json({ success: false });
        break;
    }
}