import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(ip: string): string {
    return [
      'Hello World! ',
      'Simple Sast Fresh Cup Backend',
      `Receive Request From ${ip}`,
    ].join('\n');
  }
}
