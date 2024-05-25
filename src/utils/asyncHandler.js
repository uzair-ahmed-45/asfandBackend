const asyncHandler = (fn) => async (req, res, next) => {
    try {
        Promise.resolve(fn(req, res, next)).catch(next);
    } catch (error) {
        res.status(error.code).json({
            success : false,
            message : error.message

        })
    }

}

export default asyncHandler;