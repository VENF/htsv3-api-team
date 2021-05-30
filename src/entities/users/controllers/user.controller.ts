import { Request, Response } from 'express';
import User, { IUser } from '../model/user.model';
import { Crud } from "../../../classes"
import { config } from '../../../config/config';
import jwt from 'jsonwebtoken';

function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.key, {
    expiresIn: 60 * 60 * 24
  });
}

export const signup = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  try {
    if (!email || !password || !username) {
      return res.status(400).json({
        msg: 'all fields are required'
      });
    } else {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          msg: 'this user already exist'
        });
      } else {
        const newUser: IUser = new User(req.body);
        await newUser.save();
        return res.status(201).json({
          msg: 'User has been created successfully'
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      msg: 'please send your email and password'
    });
  } else {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        msg: 'user not found'
      });
    } else {
      const validatePassword = await user.comparePassword(req.body.password);
      if (validatePassword) {
        return res.status(200).json({
          auth: true,
          token: createToken(user)
        });
      } else {
        return res.status(401).json({
          auth: false,
          msg: 'invalid password'
        });
      }
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const response = await new Crud(User).searchAll();
    const users = response.map(((user: any) => ({
      email: user.email,
      username: user.username,
    })))
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const response: any = await new Crud(User).searchOne("email", req.params.email)
    if(!response) {
      return res.status(404).json({
        msg: "user not found"
      })
    } else {
      const user: IUser = response;
      return res.status(200).json({
        email: user.email,
        username: user.username,
        _id: user._id
      })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const response: any = await new Crud(User).deleteResource("email", req.params.email)
    if(!response) {
      return res.status(404).json({
        msg: "user not found"
      })
    } else {
      const user: IUser = response;
      return res.status(200).json({
        email: user.email,
        username: user.username,
        _id: user._id,
        msg: "user has been deleted successfully"
      })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}
export const updateUser = async (req: Request, res: Response) => {
  try {
    const response: any = await new Crud(User).updateResource(req.body, "email", req.params.email)
    if(!response) {
      return res.status(404).json({
        msg: "user not found"
      })
    } else {
      const user: IUser = response;
      return res.status(200).json({
        msg: "user has been updated successfully"
      })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}