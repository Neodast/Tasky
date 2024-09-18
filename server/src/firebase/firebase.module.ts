import { Module } from '@nestjs/common';
import { firebaseProvider } from './firebase.provider';
import { ConfigModule } from '@nestjs/config';
import { FirebaseStorageService } from './firebase.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [firebaseProvider, FirebaseStorageService],
  exports: [FirebaseStorageService],
})
export class FirebaseModule {}
