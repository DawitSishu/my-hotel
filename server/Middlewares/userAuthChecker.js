const jwt = require('jsonwebtoken');



const userAuthChecker =  (req, res, next) => {

  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
    try {
      const decodedData = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decodedData;
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized to access this resource');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized to access this resource');
  }
  
};

module.exports = userAuthChecker;
