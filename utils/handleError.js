const handleHttpError = (res, message = "error", code = 400) => {
    res.status(code)
    res.send({ error: message })
};

module.exports = { handleHttpError };