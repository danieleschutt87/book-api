const check_body_input = (req, res, next) => {
  if (req.body.list_id && typeof(req.body.list_id) === "number") {
    return next()
  } else {
    return res.status(400).json({ message: 'list_id must be specified and be a number' })
  }
}

module.exports = { check_body_input }