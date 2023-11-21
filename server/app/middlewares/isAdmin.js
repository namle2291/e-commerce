function isAdmin(req,res,next){
    const {role} = req.user;
    if(role !== 'admin') throw new Error("You are not admin!!!");
    next();
}

module.exports = isAdmin;