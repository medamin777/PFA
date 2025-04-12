    const User=require("../models/User");
    const bcrypt=require("bcrypt");
    const jwt=require("jsonwebtoken");
    //Register a new user
    exports.register=async(req,res)=>{
        const {email,password,role,firstName,lastName,address}=req.body;
        if(!email || !password || !role || !firstName || !lastName )
            {console.log(req.body);
            return res.status(400).json({message:"all fields are required"});}
        const existingUser=await User.findOne({email});
        if(existingUser)
            return res.status(400).json({message:"user already exists"});
        try{
            const hashedPassword=await bcrypt.hash(password,10);
            const user=new User({email,password:hashedPassword,role,firstName,lastName,address,
                profilePicture: req.file ? `/uploads/${req.file.filename}` : null
            })
            await user.save();
            res.status(201).json({message:"user registered successfully"});
        }catch(error)
        {
            console.log(error);
            res.status(500).json({error:"user registered failed"});
        }
    };
    //login user    
    exports.login=async(req,res)=>{
        const{email,password}=req.body;
        try{
            const user=await User.findOne({email});
            if(!user)
            {
                return res.status(404).json({message:"user not found"});
            }
            const isMatch=await bcrypt.compare(password,user.password);
            if (!isMatch)
                return res.status(400).json({message:"invalid email/password"});
            const token=jwt.sign({id:user._id,role:user.role,email},process.env.JWT_SECRET,{expiresIn:"12h"});
            res.status(200).json({"message":"user logged in successfully",token});  
        }catch(error)
        {
            console.log(error);
            res.status(500).json({error:"user Login failed"});
        }
    }

    //Get CurrentUser by Id 
    exports.getCurrentUser=async(req,res)=>{
        const userId=req.user.id; //extract from the middleware
        try{
        const user=await User.findById(userId);
        if(!user)
            return res.status(404).json({message:"user not found"});
        return res.json(user);
        }catch(error)
        {
            console.log(error);
            res.status(500).json({error:"failed to get the current user"})
        }
    }
    //update user by id

    exports.updateUser=async(req,res)=>{
        const userId=req.user.id;
        try{
            const user=await User.findById(userId);
            if(!user)
                return res.status(400).json({message:"user not found"})
            const {email,firstName,lastName,address,currentPassword,newPassword}=req.body;
            if(currentPassword)
            {
                const isMatch=await bcrypt.compare(currentPassword,user.password)
                if(!isMatch) return res.status(400).json({message:"current password is incorrect"})
                user.password=await bcrypt.hash(newPassword,10);
            }
            if(email) user.email=email;
            if(firstName) user.firstName=firstName;
            if(lastName) user.lastName=lastName;
            if(address) user.address=address;
            if(req.file) user.profilePicture= `/uploads/${req.file.filename}`;
            await user.save();
            res.json({message:"user updated successfully",user})
        }catch(error)
        {
            console.log(error)
            res.json({message:error})
        }

    }

