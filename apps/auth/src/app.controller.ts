import {
  Controller,
  Get,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
export class AppController {
  @Get('test')
  getTestData(@Res() res: Response) {
    // throw new UnauthorizedException('ErrorMessagesEnum.NO_REDIRECT_URL');
    res.cookie('aaaaaaa', 'aaaaaaaa', {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      sameSite: 'lax',
    });
    res.json({ message: 'This is some test data' });
  }
}
