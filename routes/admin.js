const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async(req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
          username : username,
          password : password
    })
    
    res.json({
        msg : "Admin got succesfully created "
    })
});

router.post('/courses', adminMiddleware, async(req, res) => {
     const title = req.body.title;
     const description = req.body.description;
     const image = req.body.image;
     const price = req.body.price;
     
     const newcourse = await  Course.create({
        title,
        description,
        image,
        price
     })

     res.json({
        msg:"course got successfully created ", courseid : newcourse._id,
     })

});

router.get('/courses', adminMiddleware, async(req, res) => {
       
   const response = await Course.find({})

   res.json({
      courses : response
   })

});

module.exports = router;