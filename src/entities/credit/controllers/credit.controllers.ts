import { Request, Response } from 'express';
import Credit from "../model/credit.model"
import { Crud } from "../../../classes/Crud"
export const createCreditCard = async (userId: any) => {
    try {
        const creditAsing = Math.ceil(Math.random() * (50 - 20) + 20)
        const credit = new Credit({
            user: userId,
            credit: creditAsing
        })
        await credit.save()
    } catch (error) {
        return {}
    }
};



export const getCreditCard = async (req: Request, res: Response) => {
    const user: any = req.user
    try {
        const card = await new Crud(Credit).searchOne("user", user._id )
        return res.status(200).json(card)
    } catch (error) {
        return res.status(500).json(error)
    }
};
