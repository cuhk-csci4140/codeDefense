/**
 * Early Development Server ruotes
 */
exports.index = function(req, res){
    res.render('game/main', {
        message : "Hello World",
        session_id : "SESSION_ID"
    });
};
exports.test = function(req, res){
    res.render('game/test', {
        message : "Hello World",
        session_id : "SESSION_ID"
    });
};