const { getResponseObject } = require("../../helpers/supporter");
const { getDataList } = require("./../../mongoose/queryHelper");

const getUserList = async (user) => {
     /* Fetching all the userList from the db. 
    we have put empty({}) condition, because we want to get all the users.
    */
    const userList = await getDataList(user, {});

    if (!userList.length) {
        return {
            message: "Users not found",
            status: "success!",
            data: []
        }
    }else {
        return {
            message:"Users list fetched successfully!",
            status: "success",
            data:userList
        };
    }
}


module.exports.getUserList = async (req, res, next) => {
    const { user: User } = req.headers;

    const response = getResponseObject();

    const output = await getUserList(User);
    response.message = output.message;
    response.status = output.status;
    response.data = output.data;
    return res.status(200).json(response);

}