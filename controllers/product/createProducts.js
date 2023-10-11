const { getResponseObject } = require("../../helpers/supporter");
const { insertData, getSingleRow } = require("./../../mongoose/queryHelper");


const createProductsInDb = async (product, productList) => {
    const successList = [];
    const failureList = [];
    for (let i = 0; i < productList.length; i++) {
        /* We are checking if the productId is present in db.
        In our case, productId is unique for each product.
        */
        const productData = await getSingleRow(product, { productId: productList[i].productId });

        // If product is there, we are pushing that to failed insertionList.
        if (productData) {
            failureList.push({
                position: i + 1,
                message: "product already existed!"
            });
        } else {
            // If product with the given Id is not existed, we are creating it.
            const insertObject = {
                productId: productList[i].productId,
                productName: productList[i].productName,
                cost: productList[i].cost,
                inStock: productList[i].inStock
            }
            const insertResult = await insertData(product, insertObject);
            successList.push({
                position: i + 1,
                message: "product inserted!"

            });
        }
    }
    return {
        data: { successList, failureList },
        message: "success"
    };
}
module.exports.createProducts = async (req, res, next) => {
    const response = getResponseObject();

    const { product: Product } = req.headers;
    const productList = req.body.product_list;

    const output = await createProductsInDb(Product, productList);
    response.message = output.message;
    response.data = output.data;

    return res.status(200).json(response);
};
