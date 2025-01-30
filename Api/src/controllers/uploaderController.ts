import { Request, Response } from 'express'
import cloudinary from '../config/cloudinary'

export class UploaderController {
    static uploadImage = async (req: Request, res: Response) => {
      try {
        if (!req.file) {
          res.status(400).json({ message: 'No file uploaded' });
          return
        }

        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    
        const result = await cloudinary.uploader.upload(base64Image, {
          upload_preset: 'gfvadegu'
        });
        
        const imageUrl = result.secure_url;
    
        res.status(200).json({ imageUrl });
        return 
      } catch (error) {
        res.status(500).json({ message: 'Error uploading image' + error });
        return 
      }
    }
}