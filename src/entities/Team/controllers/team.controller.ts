import { Request, Response } from 'express';
import Team, { ITeam } from "../model/team.model"
import User from "../../users/model/user.model"
import { Crud } from "../../../classes/Crud"
import { v4 } from 'uuid';

export const createTeam = async (req: Request, res: Response) => {
    try {
        const id = v4().split('-');
        const team = new Team({ id: id[0] })
        await team.save()
        return res.status(200).json({
            msg: "team has been created successfully"
        })
    } catch (error) {
        return res.status(500).json(error)
    }

};

export const deleteTeam = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const deleted = new Crud(Team).deleteResource("id", id);
        if (!deleted) {
            return res.status(404).json({
                msg: "this team doesn't exist "
            })
        } else {
            return res.status(200).json({
                msg: "this team has been deleted successfully"
            })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
};

export const findTeam = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const team = await new Crud(Team).searchOne("id", id);
        if (!team) {
            return res.status(404).json({
                msg: "this team doesn't exist "
            })
        } else {
            console.log(team)
            return res.status(200).json(team)
        }
    } catch (error) {
        return res.status(500).json(error)
    }
};

export const allTeams = async (req: Request, res: Response) => {
    try {
        const teams = await new Crud(Team).searchAll()
        return res.status(200).json(teams)
    } catch (error) {
        return res.status(500).json(error)
    }
};

export const addUser = async (req: Request, res: Response) => {
    const { username, id } = req.body
    try {
        const user: any = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({
                msg: "this user doesn't exist "
            })
        } else {
            const team: any = await Team.findOne({ id: id });
            if (!team) {
                return res.status(404).json({
                    msg: "this team doesn't exist "
                })
            } else {
                const findUserInTeam = team.team.filter((x: any) => x.toString() === user._id.toString())
                if(findUserInTeam.length === 0){
                    team.team.push(user._id)
                    const update = await Team.findOneAndUpdate({id: team.id}, {
                        $set: {
                            team: team.team
                        }
                    })
                    return res.status(200).json({
                        msg: "users has been added successfully"
                    })
                } else {
                    return res.status(200).json({
                        msg: "this user already exist in the team"
                    })
                }
            }
        }
    } catch (error) {
        return res.status(500).json(error)
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { username, id } = req.body
    try {
        const user: any = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({
                msg: "this user doesn't exist "
            })
        } else {
            const team: any = await Team.findOne({ id: id });
            if (!team) {
                return res.status(404).json({
                    msg: "this team doesn't exist "
                })
            } else {
                const findUserInTeam = team.team.filter((x: any) => x.toString() === user._id.toString())
                if(findUserInTeam.length === 0){
                    return res.status(200).json({
                        msg: "this user is not on this team"
                    })
                } else {
                    const newUsers = team.team.filter((x: any) => x.toString() !== user._id.toString())
                    const update = await Team.findOneAndUpdate({id: team.id}, {
                        $set: {
                            team: newUsers
                        }
                    });
                    return res.status(200).json({
                        msg: "operation successfully"
                    })
                }
            }
        }
    } catch (error) {
        return res.status(500).json(error)
    }
};