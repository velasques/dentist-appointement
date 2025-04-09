const express = require("express");
const connectDB = require("./databases/db");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const bookingRouter = require("./routes/bookingRoute");
const adminRouter = require("./routes/adminRoute");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://dental.molaraiche.com",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`server is up and running at port ${PORT}`);
});
