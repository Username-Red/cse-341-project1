const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ["Contacts"]
    try {
        const result = await mongodb.getDb().db().collection('contacts').find();
        const contacts = await result.toArray();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ["Contacts"]
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
        const contacts = await result.toArray();

        if (!contacts[0]) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createContact = async (req, res) => {
    //#swagger.tags = ["Contacts"]
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favouriteColor: req.body.favouriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db().collection("contacts").insertOne(contact);
    if (response.acknowledged > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || "Some error occurred while updating the contact.");
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags = ["Contacts"]
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    const userId = new ObjectId(req.params.id);

    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favouriteColor: req.body.favouriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db().collection("contacts").replaceOne({_id: userId}, contact);
    if (response.modifiedCount) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || "Some error occurred while updating the contact.");
    }
};

const deleteContact = async (req, res) => {
    //#swagger.tags = ["Contacts"]
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection("contacts").deleteOne({_id: userId});
    if (response.deletedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || "Some error occurred while Deleting the contact.");
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact,
};
