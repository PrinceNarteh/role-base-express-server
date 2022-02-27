class AppError extends Error {
  constructor(
    readonly message: string,
    readonly statusCode: number,
    readonly status?: string
  ) {
    super(message);
    this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';
  }
}

export default AppError;
