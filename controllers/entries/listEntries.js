const listEntries = (reg, res, next) => {
    res.send({
        message:"Listar entradas",
    });
};

module.exports = listEntries;