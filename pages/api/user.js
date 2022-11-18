import User from "../../models/User";
import bcrypt from "bcrypt"

export default async function users(req , res){
    const { method } = req;
    switch(method){
        case "GET":
            try {
                const users = await User.find({});
                res.status(200).json({ success: true, data: users });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "POST":
            try {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                const user = await User.create({...req.body , password: hashedPassword});
                user.save()
                res.status(201).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}