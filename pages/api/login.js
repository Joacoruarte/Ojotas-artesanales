import User from "../../models/User";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { dbConnect } from "../../utils/db";

dbConnect()

export default async function login(req, res) {
    const { method } = req;
    
    switch (method) {
        case "POST":
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
            return res.status(400).json({ success: false });
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
            return res.status(400).json({ success: false });
            }
            const token = jwt.sign({ id: user._id , email: user.email }, process.env.JWT_SECRET)
            res.status(200).json({ success: true, token , id: user._id , email: user.email });
        } catch (error) {
            res.status(400).json({ success: false });
        }
        break;
        default:
        res.status(400).json({ success: false });
        break;
    }
}