const Joi = require('joi');
const express = require('express')
const app = express();

app.use(express.json());

const courses = [
{id: 1,name: 'course1'},
{id: 2,name: 'course2'},
{id: 3,name: 'course3'},

];


const prices=[
    {id: 1,price: 'price1'},
    {id: 2,price: 'price2'},
    {id: 3,price: 'price3'},
];
app.get('/',(req, res) => {
res.send('Hello World!!!!');
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

// /api/courses/1

app.get('/api/price',(req, res)=>{
 res.send('this is the prices page');

});



app.get('/api/prices',(req,res)=>{
    res.send(prices);
});


app.put('/api/courses/:id', (req,res)=>{

    //Look up the course
    //if not existing, return 404

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
        return res.status(404).send('the course is not available');
    }
    const { error } = validateCourse(req.body);  //getting .error  
    //validate 
    //if valid,return 400 - Bad request
    if(error){
        return res.status(400).send(error.details[0].message);
        
    }


    //Update course
    course.name = req.body.name;
    //return the updated course
    res.send(course);



});




app.delete('/api/courses/:id',(req,res)=>{
//Look up the course
    //not existing , return 404

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('the course is not available');


    //delete
    const index = courses.indexOf(course);
    courses.splice(index, 1)

    //return the same course
    res.send(course);
});

app.get('/api/courses/:id',(req,res)=>{
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('the course is not available');
   res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}





app.put('/api/pricescourses/:id', (req,res)=>{

    //Look up the course
    //if not existing, return 404

    const price = prices.find(c => c.id === parseInt(req.params.id));
    if(!price) {
        return res.status(404).send('price is not available for this book');
    }
    const { error } = validatePrice(req.body);  //getting .error  
    //validate 
    //if valid,return 400 - Bad request
    if(error){
        return res.status(400).send(error.details[0].message);
        
    }


    //Update course
    price.name = req.body.name;
    //return the updated course
    res.send(price);



});




app.delete('/api/prices/:id',(req,res)=>{
//Look up the course
    //not existing , return 404

    const price = prices.find(c => c.id === parseInt(req.params.id));
    if(!price) return res.status(404).send('price is not available for this book');


    //delete
    const index = prices.indexOf(price);
    prices.splice(index, 1)

    //return the same course
    res.send(price);
});

app.get('/api/prices/:id',(req,res)=>{
   const price = prices.find(c => c.id === parseInt(req.params.id));
   if(!price) return res.status(404).send('price is not available for this book');
   res.send(price);
});

function validatePrice(price){
    const schema = {
        name: Joi.string().min(1).required()
    };

    return Joi.validate(price, schema);
}






// environment variable PORT -part of an environment on which it runs
const port = process.env.PORT||3000
app.listen(port,()=>console.log(`Listening on port ${port}...`))
