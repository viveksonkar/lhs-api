import multer, { FileFilterCallback, memoryStorage } from "multer";

const imgUploadOptions: multer.Options = {
    storage: memoryStorage(),
    fileFilter: (req : Express.Request, file : Express.Multer.File, acceptFile : FileFilterCallback) => {
		const allowedMimeTypes = [
			"image/jpeg",
			"image/png",
			"image/gif",
			"image/webp",
			"image/bmp",
			"image/tiff",
			"application/pdf",
			"application/vnd.ms-excel",
			"video/mp4",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		];
		acceptFile(null, allowedMimeTypes.includes(file.mimetype));
	},
	limits: {
		fileSize: 1024 * 1024 * 35, // 35MB max file size
		files: 5 // max of five files at a time
	}
  }

  export default imgUploadOptions;