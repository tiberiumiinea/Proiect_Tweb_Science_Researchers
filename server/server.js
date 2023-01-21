const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const cors = require('cors')

const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'database.db',
    define:{
        timestamps: false
    }
})

const Researcher = sequelize.define('researcher', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING
})

const Study = sequelize.define('study', {
    title: Sequelize.STRING,
    fieldOfStudy: Sequelize.STRING
})

Researcher.hasMany(Study)

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/sync', async(req,res) => {
    try {
        await sequelize.sync({force: true})        
        res.status(201).json({message:'tables created'})
    } catch (err){
        console.warn(err)
        res.status(500).json({message:'Server error'})
    }
})

app.get('/researchers', async(req,res)=>{
    try {
        const researchers = await Researcher.findAll()
        res.status(200).json(researchers)
    } catch (err){
        console.warn(err)
        res.status(500).json({message:'Server error'})
    }
})

app.post('/researchers', async(req,res)=>{
    try {
        await Researcher.create(req.body)
        res.status(201).json({message:'created'})
    } catch (err){
        console.warn(err)
        res.status(500).json({message:'Server error'})
    }
})

app.get('/researchers/:rid', async(req,res)=>{
    try {
        const researcher = await Researcher.findByPk(req.params.rid, { include: Study } )
        if(researcher){
            res.status(200).json(researcher)            
        } else {
            res.status(404).json({message:"Not found"})   
        }
    } catch (err){
        console.warn(err)
        res.status(500).json({message:'Server error'})
    }
})

app.put('/researchers/:rid', async(req,res)=>{
    try {
        const researcher = await Researcher.findByPk(req.params.rid)
        if(researcher){
            await researcher.update(req.body, { fields:['firstName','lastName'] } )
            res.status(202).json({message:"Update accepted"})            
        } else {
            res.status(404).json({message:"Not found"})   
        }
    } catch (err){
        console.warn(err)
        res.status(500).json({message:'Server error'})
    }
})

app.delete('/researchers/:rid', async(req,res)=>{
    try {
        const researcher = await Researcher.findByPk(req.params.rid)
        if(researcher){
            await researcher.destroy()
            res.status(202).json({message:"Deletion accepted"})            
        } else {
            res.status(404).json({message:"Not found"})   
        }
    } catch (err){
        console.warn(err)
        res.status(500).json({message:'Server error'})
    }
})


app.get('/researchers/:rid/studies', async(req,res)=>{
    try {
        const researcher = await Researcher.findByPk(req.params.rid)
        if(researcher){
            const studies = await researcher.getStudies()
            res.status(200).json(studies)            
        } else {
            res.status(404).json({message:"Not found"})   
        }
    } catch (err){
        console.warn(err)
        res.status(500).json({message:'Server error'})
    }
})

app.post('/researchers/:rid/studies', async(req,res)=>{
    try {
        const researcher = await Researcher.findByPk(req.params.rid)
        if(researcher){
            const study = req.body
            study.researcherId = researcher.id
            await Study.create(study)
            res.status(201).json({message:'created'})
        } else {
            res.status(404).json({message:"Not found"})   
        }
    } catch (err){
        console.warn(err)
        res.status(500).json({message:'Server error'})
    }
})

app.get('/researchers/:rid/studies/:sid', async(req,res)=>{
    try {
        const researcher = await Researcher.findByPk(req.params.rid)
        if(researcher){
            const studies = await researcher.getStudies({where: {id: req.params.sid}})
            const study = studies.shift()
            if(study){
                res.status(200).json(study)  
            } else {
                res.status(404).json({message:"Study not found"})   
            }                      
        } else {
            res.status(404).json({message:"Researcher not found"})   
        }
    } catch (err){
        console.warn(err)
        res.status(500).json({message:'Server error'})
    }
})

app.put('/researchers/:rid/studies/:sid', async(req,res)=>{
    try {
        const researcher = await Researcher.findByPk(req.params.rid)
        if(researcher){
            const studies = await researcher.getStudies({where: {id: req.params.sid}})
            const study = studies.shift()
            if(study){
                await study.update(req.body)
                res.status(202).json({message:"Update accepted"})            
            } else {
                res.status(404).json({message:"Study not found"})   
            }                      
        } else {
            res.status(404).json({message:"Researcher not found"})   
        }
    } catch (err){
        console.warn(err)
        res.status(500).json({message:'Server error'})
    }
})

app.delete('/researchers/:rid/studies/:sid', async(req,res)=>{
    try {
        const researcher = await Researcher.findByPk(req.params.rid)
        if(researcher){
            const studies = await researcher.getStudies({where: {id: req.params.sid}})
            const study = studies.shift()
            if(study){
                await study.destroy()
                res.status(202).json({message:"Deletion accepted"})            
            } else {
                res.status(404).json({message:"Study not found"})   
            }                      
        } else {
            res.status(404).json({message:"Researcher not found"})   
        }
    } catch (err){
        console.warn(err)
        res.status(500).json({message:'Server error'})
    }
})


app.listen(8080)
