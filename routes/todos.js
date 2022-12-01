const express=require('express')
const uuid=require('uuid')

const router= express.Router();

const todos= [
    {
        id: 1,
        name: "learn html",
        work: "done"
    },
    {
        id: 2,
        name: "learn css",
        work: "done"
    },
    {
        id: 3,
        name: "learn js",
        work: "done"
    },
    {
        id: 4,
        name: "learn sql",
        work: "not-done"
    },
    {
        id: 5,
        name: "learn python",
        work: "not-done"
    }
]

//Read all todos
router.get('/', (req,res) =>{
    res.json(todos);
})

//Get a todo with id
router.get('/:id', (req,res)=>{
    const found= todos.some(todo=>todo.id===parseInt(req.params.id))
    if(found){
        res.json(todos.filter(todo=> todo.id===parseInt(req.params.id)))
    }else{
        res.status(400).json({meg:`no todos with the id ${req.params.id}`})
    }
})

//create new todos
router.post('/', (req,res)=> {

    const newtodo= {
        id: uuid.v4(),
        name: req.body.name,
        work: req.body.work
    }

    if(!newtodo.name || !newtodo.work){
        return res.status(400).json({ meg:'please fill details' });
    }

    todos.push(newtodo)
    res.json({msg:"new todo is added",todos})
})

//update exisitind todo
router.patch('/:id', (req,res)=>{
    const found= todos.some(todo=>todo.id===parseInt(req.params.id))
    if(found){
        const updatetodo=req.body;
        todos.forEach(todo=>{
            if(todo.id===parseInt(req.params.id)){
                todo.name=updatetodo.name?updatetodo.name:todo.name
                todo.work=updatetodo.work?updatetodo.name:todo.work

                res.json({ msg:`todo with id no.${req.params.id} is updated`,todo})
            }
        })
    }else{
        res.status(400).json({meg:`no todos with the id ${req.params.id}`})
    }
})

//delete a todos
router.delete('/:id', (req,res)=>{      
    
    const found= todos.some(todo=>todo.id===parseInt(req.params.id))
    if(found){
        res.json({ msg: `todo with id no.${req.params.id} is deleted`,
        todos:todos.filter(todo=> todo.id!==parseInt(req.params.id))})
    }else{
        res.status(400).json({meg:`no todos with the id ${req.params.id}`})
    }
})

module.exports= router;
