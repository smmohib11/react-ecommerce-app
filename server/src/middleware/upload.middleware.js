import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
  let uploadPath = "src/uploads/";

  switch (file.fieldname) {
    case "image":
      uploadPath += "categories";
      break;

    case "thumbnail":
    case "images":
      uploadPath += "products";
      break;

    case "logo":
      uploadPath += "brands";
      break;

    default:
      uploadPath += "others";
      break;
  }

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  cb(null, uploadPath);
},
});

const upload = multer({ storage });

export default upload;