const { getResponseObject } = require("../../helpers/supporter");
const { getSingleRow } = require("./../../mongoose/queryHelper");
const generateJwtToken= require("./../../helpers/generateJwtToken");

const getUserDetails = async (user, email, password) => {
    // Getting the user details using email
    const userData = await getSingleRow(user, { email });

    if (!userData) {
        return { 
            message: 'Invalid email',
            token: null,
            status: "success"
        };
    }
    /* We are comparing the password entered(text format) with hashed password from DB.
    we are doing this by the method(comparePassword) we attached to User schema.
    */
    const isPasswordValid = await userData.comparePassword(password);

    if (isPasswordValid) {
        // Generating jwt token with userData.
        const token = await generateJwtToken(userData);
        return{
            token,
            message:"Successfully loggedIn",
            status:"success"
        }
        
    } else {
        return {
            message:"login unsuccessful!",
            status: "error",
            token:null
        };
    }
}


module.exports.login = async (req, res, next) => {
    const { user: User } = req.headers;

    const { email, password } = req.body;
    const response = getResponseObject();

    const output = await getUserDetails(User, email, password);
    response.message = output.message;
    response.token = output.token;
    response.status = output.status;
    return res.status(200).json(response);

}