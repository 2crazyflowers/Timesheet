var express     =  require('express'),
    passport    =  require("passport"),
    User        =  require("./models/User"),   
    router      =  express.Router();


// Routes for user: login, logout, timeentries
// Below are HTTP methods. Routes for webpages, getting the static files
//route for login page
router.get("/", function (req, res) {
    res.render('/');
});

router.post("/", passport.authenticate("local",
    {
    successRedirect: "/timeentries",
    failureRedirect: "/"
    }), function(req, res){ 
});

//route for logout page
router.get("/logout", function (req, res) {
    req.logOut();
    res.redirect("/");
});

//     // Create a new user using req.body to test if saving user to database working
//     // without using passport etc. just simple connection
//     // User.create(req.body)
//     //     .then(function(dbUser) {
//     //     // If saved successfully, send the the new User document to the client
//     //     res.json(dbUser);
//     //     })
//     //     .catch(function(err) {
//     //     // If an error occurs, send the error to the client
//     //     res.json(err);
//     //     });

//     // var newUser = new User({
//     //     username: req.body.username,
//     //     password: req.body.password
//     // });
//     // console.log(newUser);

//     var newUser = new User({username: req.body.username});
    
//     User.register(newUser, req.body.password, function(err, newCreatedUser){
//         if(err) {
//             console.log('There is an error signing up: ' + err);
//             res.redirect('/signup');
//         }
//         passport.authenticate('local')(req, res, function(){
//             //console.log(req.body);
//             res.redirect('/');
//         });
//     });
    
// });

function isLoggedIn(req, res, next) {
    //console.log('You think you are logged in, but are you?');
    if(req.isAuthenticated()) {
        console.log('You are still logged in');
        return next();
    }
    res.redirect('/login');
};


module.exports  = router;