
const handleMongooseError = (err) => {
    err.error_code = "Mongoose error";
    return Promise.reject(err);
};

const insertData = (dataModel, dataToInsert) => {
    return dataModel.create(dataToInsert)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            err.error_code = "Mongoose error";
            throw err;
        });
};

const getSingleRow = (dataModel, query) => {
    return dataModel.findOne(query)
        .then((res) => {
            if (res) {
                return res;
            } else {
                return false
            }
        })
        .catch((err) => {
            console.error('Mongoose error:', err);
            err.error_code = "Mongoose error";
            throw err;
        });
};

const findOneAndDelete = (dataModel, query) => dataModel.findOneAndDelete(query).catch(handleMongooseError);

const findOneAndUpdate = (dataModel, whereToUpdate, whatToUpdate) =>
    dataModel.findOneAndUpdate(whereToUpdate, whatToUpdate, { upsert: true }).catch(handleMongooseError);

const insertMany = (dataModel, dataToInsert) => dataModel.insertMany(dataToInsert).catch(handleMongooseError);

const getDataList = (dataModel, query, sortQuery) => {
    if (!sortQuery) sortQuery = {};

    return new Promise((resolve, reject) => {
        dataModel
            .find(query)
            .sort(sortQuery)
            .exec()
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                console.error("err", err);
                return reject(err);
            });
    });
};



module.exports = {
    getSingleRow,
    findOneAndDelete,
    findOneAndUpdate,
    insertData,
    insertMany,
    getDataList
};
