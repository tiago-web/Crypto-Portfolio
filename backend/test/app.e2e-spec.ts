import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TokensModule } from './../src/tokens/tokens.module';

describe('Tokens Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TokensModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tokens (GET)', () => {
    return request(app.getHttpServer()).get('/tokens').expect(200);
  });
});
