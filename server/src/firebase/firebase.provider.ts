import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

export const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const firebaseConfig = {
      type: configService.get<string>('firebase.project.type'),
      project_id: configService.get<string>('firebase.project.id'),
      private_key_id: configService.get<string>('firebase.private_key.id'),
      private_key: configService.get<string>('firebase.private_key._'),
      client_email: configService.get<string>('firebase.client.email'),
      client_id: configService.get<string>('firebase.client.id'),
      auth_url: configService.get<string>('firebase.auth.url'),
      token_url: configService.get<string>('firebase.token.url'),
      auth_provider_x509_cert_url:
        configService.get<string>('firebase.auth.cert'),
      client_x509_cert_url: configService.get<string>('firebase.client.cert'),
      universe_domain: configService.get<string>('firebase.universe_domain'),
    } as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      storageBucket: configService.get<string>('firebase.storage.bucket'),
    });
  },
};
