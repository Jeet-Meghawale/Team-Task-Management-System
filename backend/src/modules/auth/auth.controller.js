export const registerUser = async (req, res, next) => {
  try {
    res.status(201).json({
      success: true,
      message: "Register route working"
    })
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Login route working"
    })
  } catch (error) {
    next(error)
  }
}