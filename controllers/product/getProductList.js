const { getResponseObject } = require("../../helpers/supporter");
const { getDataList } = require("./../../mongoose/queryHelper");

const getProducts = async (product) => {
    /* Fetching all the productList from the db. 
    we have put empty({}) condition, because we want to get all the products.
    */
    const productList = await getDataList(product, {});

    if (!productList.length) {
        return {
            message: "No products found!",
            status: "success!",
            data: []
        }
    }else {
        return {
            message:"Product list fetched successfully!",
            status: "success",
            data:productList
        };
    }
}


module.exports.getProductList = async (req, res, next) => {
    const { product: Product } = req.headers;

    const response = getResponseObject();

    const output = await getProducts(Product);
    response.message = output.message;
    response.status = output.status;
    response.data = output.data;
    return res.status(200).json(response);

}