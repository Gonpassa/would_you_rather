module.exports = {
    getIndex: (req,res)=>{
/*         if(req.user){
            res.redirect('/questions')
        } */
        res.render('index.ejs', {user: req.user})
    }
}