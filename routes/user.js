const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
   
    await User.create({
        username,
        password
    })
  
    res.json({
        msg : "user got succesfully created "
    })
});

router.get('/courses', async(req, res) => {
    
    const response = await Course.find({})

    res.json({
       courses : response
    })

});

router.post('/courses/:courseId', userMiddleware, (req, res) => {

    const courseid = req.params.courseId;
    const username = req.params.username
   
    User.updateOne({
        username:username
    },{
        purchasedcourses :{
            "$push" : courseid
        }
    });

    res.json({
        msg : "purchase completed"
    })
    
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router