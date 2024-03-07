import { Controller, All, Req, Res } from '@nestjs/common';

import { Request, Response } from 'express';
import { ProxyService } from 'src/proxy/proxy.service';

@Controller('auth')
export class AuthController {
  constructor(private proxyService: ProxyService) {}

  @All('*')
  handleAuthRequest(@Req() req: Request, @Res() res: Response) {
    this.proxyService.forwardAuthRequest(req, res);
  }
}
