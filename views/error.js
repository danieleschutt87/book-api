module.exports = {
  generic: (res) => (err) => {
    return res
      .status(err.status || 500)
      .json({message: err.message})
  }
}