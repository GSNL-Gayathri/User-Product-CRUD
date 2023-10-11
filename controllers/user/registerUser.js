const { getResponseObject } = require("../../helpers/supporter");
const { getSingleRow, insertData } = require("./../../mongoose/queryHelper");


const createUser = async(user, userName, password, email)=>{
/* We are checking if the email is already taken or not.
In our case, email is unique for each user.
*/
const userData = await getSingleRow(user, {email});

if(userData){
  return {
    data: {},
    message: "email id is taken! Try with a new one!"
  }
}else{
  // If email id is not found in db, we can insert the user.
  const insertObject = {
    userName,
    email,
    password
  }
  const insertResult = await insertData(user, insertObject);
  return {
    data:insertResult,
    message: "registered Successfully!"
  }
}
}
module.exports.registerUser = async (req, res, next)=> {
  const response = getResponseObject();

  const { user:User} = req.headers;
  const userName = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const output = await createUser(User, userName, password, email);
  response.message = output.message;
  response.data = output.data;

  return res.status(200).json(response);
};
