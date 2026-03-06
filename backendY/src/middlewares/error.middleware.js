export const errorHandle = (err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;
  const message =
    err.message || "Une ereur serveur ou interne ou c'est a cause de hervé";

  res.status(status).json({
    success: false,
    message,
  });
};
