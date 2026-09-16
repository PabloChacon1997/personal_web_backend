import cloudinary from "../config/cloudinary"


export const uploadToCloudinary = (buffer: Buffer): Promise<string> => {
  return new Promise((res, rej) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'avatars' },
      (error, result ) => {
        if(error || !result) return rej(error);
        res(result.secure_url)
      }
    );
    stream.end(buffer);
  })
}