
var user = require("../config/database").user;



exports.list = function (req, res){
    user.findAll()
        .then(
            (result)=>{
                res.status(200)
                res.type("application/json");
                res.json(result);
            }
        ).catch(
            (err)=>{
                res.status(500)
                res.type("application/json");
                res.json({error:true});
                
            }
        )
}









// Error handling 
function handleErr(res) {
    handleErr(res, null);
}

function handleErr(res, err) {
    console.log(err);
    res.status(500).json({error: true});
}
