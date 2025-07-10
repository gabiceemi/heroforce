import { Controller, Get, Logger } from '@nestjs/common';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  @Get()
  check() {
    return { message: 'Tem umas baratas que a gente vai ter que exterminar!' };
  }
}
