import { Request, Response } from 'express';
import Repository, { IRepository } from '../model/repository.model';
import User from "../../users/model/user.model"
import { Crud } from "../../../classes/Crud"

export const createRepository = async (req: Request, res: Response) => {
    const user: any = req.user;
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

export const getRepositorys = async (req: Request, res: Response) => {
    try {
        const repositorys = await new Crud(Repository).searchAll();
        return res.status(200).json(repositorys)
    } catch (error) {
        return res.status(500).json(error)
    }
};

export const getRepository = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const repositorys = await new Crud(Repository).searchOne("_id", id)
        return res.status(200).json(repositorys)
    } catch (error) {
        return res.status(500).json(error)
    }
};

export const getRepositoryFromUser = async (req: Request, res: Response) => {
    const user: any = req.user;
    try {
        const repositorys = await Repository.find({author: user._id})
        return res.status(200).json(repositorys)
    } catch (error) {
        return res.status(500).json(error)
    }
};

export const deleteRepo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const repositorys: any = await new Crud(Repository).deleteResource("_id", id)
        return res.status(200).json(repositorys)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
};