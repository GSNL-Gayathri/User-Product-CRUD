const { getResponseObject } = require("../../helpers/supporter");
const { getSingleRow, findOneAndUpdate } = require("./../../mongoose/queryHelper");

const updateProductInDb = async (product, productId, data ) => {
    // Checking whether the product exists or not.
    const productExists = await getSingleRow(product, {productId});

    // If product doesn't exist, we are giving error message.
    if (!productExists) {
        return {
            message: `Product with id ${productId} not found`,
            status: "error!",
            data: []
        }
    }else {
        //If product is found with given Id, we are updating it.
        const updateObject={
            productName: data.productName,
            cost: data.cost,
            inStock: data.inStock

        };
        const updateProduct = await findOneAndUpdate(product, {productId}, updateObject);
        return {
            message:`Successfully updated product with${productId}`,
            status: "success!",
            data:updateProduct
        };
    }
}


module.exports.updateProduct = async (req, res, next) => {
    const { product: Product } = req.headers;
    const body = req.body
    const productId = req.query.productId;

    const response = getResponseObject();

    const output = await updateProductInDb(Product, productId, body);
    response.message = output.message;
    response.status = output.status;
    response.data = output.data;
    return res.status(200).json(response);

}