import express from 'express'
import { addDesign, listDesign, removeDesign, updateDesignQuantity } from '../controllers/DesignController'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const designRouter = express.Router();

const uploadDir = process.env.VERCEL
  ? "/tmp"
  : path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

designRouter.post("/add", upload.single("image"), addDesign);
designRouter.get("/list", listDesign);
designRouter.post("/update-quantity", updateDesignQuantity);
designRouter.post("/remove", removeDesign);

export default designRouter;