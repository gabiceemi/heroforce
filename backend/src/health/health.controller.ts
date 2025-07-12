import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Logger } from '@nestjs/common';

@ApiTags('health')
@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  @Get()
  @ApiOperation({ summary: 'Verifica o status da aplicação' })
  @ApiResponse({
    status: 200,
    description: 'Aplicação está respondendo corretamente',
    schema: {
      example: { message: 'Tem umas baratas que a gente vai ter que exterminar!' },
    },
  })
  check() {
    return { message: 'Tem umas baratas que a gente vai ter que exterminar!' };
  }
}
