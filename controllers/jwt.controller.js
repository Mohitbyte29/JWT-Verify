let users = []
let nextId = 1

export const register = (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({success: false, message: "Email or Password is missing"})
    }
    if(users.find(n => n.email === email)){
        return res.status(409).json({success: false, message: "User Already Exists!"})
    }
}