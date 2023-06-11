import { RequestHandler } from 'express'
import { UserService } from './user.service'

const createUserToDB: RequestHandler = async (req, res, next) => {
  try {
    const { user } = await req.body
    const result = await UserService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    // res.status(400).json({
    //   success: false,
    //   message: 'Failed to create user',
    // })
    next(error)
  }
}

export const UserController = {
  createUserToDB,
}