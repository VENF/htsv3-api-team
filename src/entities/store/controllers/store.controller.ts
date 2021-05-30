import { Request, Response } from 'express';
import Store from "../model/store.model"
import Credit from "../../credit/model/credit.model"
import { Crud } from "../../../classes/Crud"
import { v4 } from 'uuid';

export const store = async (req: Request, res: Response) => {
    try {
        const id = v4().split('-');
        const store: any = new Store({
            name: req.body.name,
            credits: req.body.credits,
            stock: req.body.stock,
            id: id[0]
        })
        await store.save()
        return res.status(200).json({
            msg: "added product"
        })
    } catch (error) {
        return res.status(500).json(error)
    }

};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await new Crud(Store).searchAll()
        return res.status(200).json({
            products 
        })
    } catch (error) {
        return res.status(500).json(error)
    }

};

export const buy = async (req: Request, res: Response) => {
    const user: any = req.user;
    const { id, cant, credits } = req.body
    try {
        const product = await Store.findOne({_id: id})
        if(!product){
            return res.status(404).json({
                msg: "product not found" 
            }) 
        } else {
            await Store.findOneAndUpdate({ _id: id }, {
                $set: {
                    stock: product.stock - cant
                }
            })
            await Credit.findOneAndUpdate({ user: user._id }, {
                $set: {
                    credit: credits
                }
            })
            return res.status(200).json({
                msg: "operation successfully"
            })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
};
