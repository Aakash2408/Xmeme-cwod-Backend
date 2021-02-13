const model = require('../model/models')

const postMeme = async (req, res)=>{
    try{
        console.log(req.query)
        if(!req.query.name || !req.query.caption || !req.query.url ){
            res.status('400').json({
                message: 'Query Incomplete'
            })
        }else{
            let existingMeme = await model.findOne({name: req.query.name, caption : req.query.caption, url : req.query.url})
            if(existingMeme){
                res.status(201).json({
                    "message": 'Dupicate Meme'
                })
                return
            }
            if(!/(http(s?):\/\/)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/.test(req.query.url)){
                res.status(400).json({
                    message: "URL is Invalid"
                })
                return
            }
            let newMeme = await model.create({
                name: req.query.name,
                caption : req.query.caption,
                url : req.query.url
            })
            res.status(201).json({
                id : newMeme.id
            })
        }
    }catch{
        res.status(500).json({
            message: 'Server error'
        })
    }
}
const getMeme = async (req, res)=>{
    try {
        let latestMemes =await model.find({}, {_id : 0}).sort({_id : -1}).limit(100)
        res.status(200).json(latestMemes)
    } catch (error) {
        res.status(500).json({
            message : 'Server Error'
        })
    }
}
const updateMeme = async (req, res)=>{

    // try {
        if(!req.params.id){
            res.status(400).json({
                message : "id is not given"
            })
        }else if(req.body.name && req.body.caption && req.body.url){
            let meme = await model.findOneAndUpdate({id:req.params.id}, {name:req.body.name, caption:req.body.caption, url:req.body.url})
            res.status(200).json({
                message: 'Updated Successfully'
            })
        }else{
            let meme = await model.findOne({id:req.params.id})
            await model.findOneAndUpdate({id:req.params.id}, {name:req.body.name || meme.name , caption: req.body.caption || meme.caption, url: req.body.url || meme.url})
            res.status(200).json({
                message: "Updated Successfully"
            })
        }
    // } catch (error) {
    //     res.status(500).json({
    //         message: 'Server Error'
    //     })
    // }

}
const getMemeById = async (req, res)=>{
    try {
        let memeById =await model.findOne({id :req.params.id}, {_id : 0})
        if(!memeById){
            res.status(404).json({})
        }else{
            res.status(200).json(memeById)
        }
    } catch (error) {
        res.status(500).json({
            message : 'Server Error'
        })
    }
}
module.exports = {postMeme, getMeme, updateMeme, getMemeById}