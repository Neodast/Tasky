import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseStorageService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucket = admin.storage().bucket();

    const fileName = `${uuidv4()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });

    return fileUpload.publicUrl();
  }
}
