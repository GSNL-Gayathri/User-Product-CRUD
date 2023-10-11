const { getResponseObject } = require("../../helpers/supporter");
const { getSingleRow, findOneAndDelete } = require("./../../mongoose/queryHelper");

const deleteProductFromDb = async (product, productId) => {
    // Checking whether the product with given id exist or not.
    const productExists = await getSingleRow(product, {productId});

    // If product is not there, we are giving error message.
    if (!productExists) {
        return {
            message: `Product with id ${productId} not found`,
            status: "error!",
            data: []
        }
    }else {
        // If product with given id exists, we are deleting it.
        const deleteProduct = await findOneAndDelete(product, {productId});
        return {
            message:`Successfully deleted product with${productId}`,
            status: "success!",
            data:deleteProduct
        };
    }
}


module.exports.deleteProduct = async (req, res, next) => {
    //Getting Product schema from request headers
    const { product: Product } = req.headers;

    /*We can also take this id from req.body also
    const {productId} = req.body;
    */
    const productId = req.query.productId;

    const response = getResponseObject();

    const output = await deleteProductFromDb(Product, productId);
    response.message = output.message;
    response.status = output.status;
    response.data = output.data;
    return res.status(200).json(response);

}