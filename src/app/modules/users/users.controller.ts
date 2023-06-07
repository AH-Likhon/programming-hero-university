import { NextFunction, Request, Response } from 'express'
import usersService from './users.service'

const createUserToDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = await req.body
    const result = await usersService.createUser(user)
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

export default {
  createUserToDB,
}
