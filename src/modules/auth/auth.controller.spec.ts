import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../prisma/prisma.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await prisma.user.deleteMany(); // limpa os usuários após o teste
    await app.close();
  });

  const user = {
    email: 'test@example.com',
    password: '12345678',
    name: 'Test User',
  };

  let token = '';

  it('Deve registrar um novo usuário', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send(user)
      .expect(201);

    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('Deve fazer login com o usuário criado', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(201);

    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('Deve retornar os dados do usuário autenticado', async () => {
    const res = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toMatchObject({
      email: user.email,
      name: user.name,
    });
  });
});
