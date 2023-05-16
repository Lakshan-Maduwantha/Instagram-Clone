const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const imageRoutes = require("./routes/imageRoutes");
const commentRoutes = require("./routes/commentRoutes");
const { Sequelize } = require('sequelize');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const app = express();

const Image = require("./models/Image");
const Comment = require("./models/Comment");
const User = require("./models/user");

Image.hasMany(Comment);
Comment.belongsTo(Image);

User.hasMany(Image);
Image.belongsTo(User);

app.use(express.json());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/images", imageRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});