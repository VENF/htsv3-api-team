import { Request, Response } from 'express';
import Repository, { IRepository } from '../model/repository.model';
import User from "../../users/model/user.model"


export const createRepository = async (req: Request, res: Response) => {
    const user: any = req.user;
    req.body.stack = JSON.parse(req.body.stack);
    req.body.author = user._id;
    const repo: IRepository = new Repository(req.body);
    try {
        await repo.save();
        await User.findOneAndUpdate({_id: user._id}, {$inc: {repos: 1}});
        return res.status(200).json({
            msg: "repository has been created successfully"
        })
    } catch (error) {
        return res.status(500).json(error)
    }
};