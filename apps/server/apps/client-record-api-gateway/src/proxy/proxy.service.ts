import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { createProxyServer } from 'http-proxy';

@Injectable()
export class ProxyService {
  private proxy = createProxyServer({});

  constructor() {
    this.proxy.on('proxyReq', (proxyReq, req) => {
      if ('body' in req) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    });
  }

  async forwardRequest(targetUrl: string, req: Request, res: Response) {
    const options = {
      target: targetUrl,
      changeOrigin: true,
      selfHandleResponse: false,
      ignorePath: true,
    };

    this.proxy.web(req, res, options);
  }
}
