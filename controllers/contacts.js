const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    })
};

const getSingle = async (req, res) => {
    const userId = ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({_id: userId});
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts[0]);
    })
};

module.exports = {
    getAll,
    getSingle,
}