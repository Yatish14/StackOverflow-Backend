import mongoose from "mongoose"
import Users from '../models/auth.js'

export const getAllUsers = async (req, res) => {
    try
    {
        const allUsers = await Users.find()
        const allUserDetails = []

        allUsers.forEach(user => {
            allUserDetails.push({_id: user._id, name: user.name, tags: user.tags, about: user.about, joinedOn: user.joinedOn})
        })
        res.status(200).json(allUserDetails)
    }
    catch(err)
    {
        res.status(404).json({message: err.message})
    }
}

export const updateProfile = async (req, res) => {
    try
    {
        const {id: _id} = req.params;
        const { name,about,tags } = req.body;

        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).send('question unavailable...');
        }

        const updatedProfile = await Users.findByIdAndUpdate( _id, { $set: { 'name': name, 'about': about, 'tags': tags }}, { new: true } )


        res.status(200).json(updatedProfile)
    }
    catch(err)
    {
        res.status(405).json({message: err.message})
    }
}