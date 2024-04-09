import { All, Controller, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProxyService } from './proxy/proxy.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private proxyService: ProxyService,
    private configService: ConfigService,
  ) {}

  @All('auth/*')
  auth(@Req() req: Request, @Res() res: Response) {
    const wildcardPath = req.originalUrl.split('/auth')[1];
    const url = `http://localhost:${this.configService.get(
      'AUTH_APP_PORT',
    )}${wildcardPath}`;
    this.proxyService.forwardRequest(url, req, res);
  }

  @All('api/*')
  core(@Req() req: Request, @Res() res: Response) {
    const wildcardPath = req.originalUrl.split('/api')[1];
    const url = `http://localhost:${this.configService.get(
      'CORE_APP_PORT',
    )}${wildcardPath}`;
    this.proxyService.forwardRequest(url, req, res);
  }
}
