
import User from '../models/User'
import bcrypt from 'bcrypt'
import dbConnect from '../utils/db'
import jwt from 'jsonwebtoken'

class Users {
  constructor () {
    this.user = User
  }

  async getUsers (res) {
    try {
      await dbConnect()
      const users = await this.user.find({})
      res.status(200).json({ success: true, data: users })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  }

  async createUser (req, res) {
    try {
      await dbConnect()
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      const user = await this.user.create({ ...req.body, password: hashedPassword })
      user.save()
      res.status(201).json({ success: true, data: user })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  }

  async loginUser (req, res) {
    try {
      await dbConnect()
      const user = await this.user.findOne({ email: req.body.email })
      if (!user) return res.status(400).json({ success: false })

      if (user.role === 'ADMIN') {
        if (req.body.password === process.env.ADMIN_PASSWORD) {
          const isMatch = await bcrypt.compare(req.body.password, user.password)
          if (!isMatch) return res.status(400).json({ success: false })
          const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET)
          return res.status(200).json({
            success: true,
            token,
            id: user._id,
            email: user.email,
            role: user.role
          })
        }
      } else {
        const isEqual = await bcrypt.compare(req.body.password, user.password)
        if (!isEqual) return res.status(400).json({ success: false })
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET)
        res.status(200).json({ success: true, token, id: user._id, email: user.email, role: user.role })
      }
    } catch (error) {
      res.status(400).json({ success: false })
    }
  }
}

export default Users
