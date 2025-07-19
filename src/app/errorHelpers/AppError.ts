class AppError extends Error {
  public startusCode: number;

  constructor(startusCode: number, message: string, stack = '') {
    super(message)

    this.startusCode = startusCode

    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
export default AppError;