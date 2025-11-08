import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token)
      return res.status(401).json({ error: "No token provided, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded = { id: user._id }
    next();
  } catch (error) {
    console.error("❌ Auth middleware error:", error);
    res.status(401).json({ error: "Token is not valid" });
  }
};

export default authMiddleware;
