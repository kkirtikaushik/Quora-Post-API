const express= require("express");
const app = express();
const port = 1997;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
app.use(methodOverride("_method"))
app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.get("/",(req,res)=>{
    res.send("server working well");

});


app.listen(port,()=>{
    console.log(`listening to port :${port}`);
}
);

let posts =[ {
    id:uuidv4(),
 username: "apnacollege",
 content: "I love coding ",
 },
{
    id:uuidv4(),
    username:"kirti",
    content:"Hardwork is imporant to acieve the success",
},
{
    id:uuidv4(),
    username:"Nitin",
    content:"I am working at Shriram finance",
}];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});

});
app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    let id =uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post = posts.find((p)=>id=== p.id);
    console.log(post);
    res.render("show.ejs",{post});
    // console.log(id);

}
);

app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newContent=req.body.content;
    let post = posts.find((p)=>id=== p.id);
    post.content= newContent;
    console.log(post);
    res.redirect("/posts");

})

// Route to display the edit form
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);

    
        res.render("edit.ejs", { post }); // Pass the post to the view
    
});

app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
})
