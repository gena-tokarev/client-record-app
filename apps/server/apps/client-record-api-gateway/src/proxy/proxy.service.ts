import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import { catchError, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProxyService {
  constructor(private httpService: HttpService) {}

  async forwardAuthRequest(req: Request, res: Response) {
    const url = `http://localhost:${process.env.AUTH_APP_PORT}${req.originalUrl}`;
    const method = req.method.toLowerCase();

    const observable$ = this.httpService
      .request({
        method,
        url,
        data: req.body,
        headers: { ...req.headers },
      })
      .pipe(
        map((response) => {
          Object.entries(response.headers).forEach(
            ([key, value]: [string, string]) => {
              res.setHeader(key, value);
            },
          );
          res.status(response.status).send(response.data);
        }),
        catchError((error) => {
          throw new Error(error.response?.data);
        }),
      );

    return await lastValueFrom(observable$);
  }
}
