import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@ApiTags('root')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Informações iniciais da API' })
  @ApiResponse({
    status: 200,
    description: 'Retorna nome, versão e status da API',
    schema: {
      example: {
        name: 'HeroForce API',
        version: '1.0.0',
        message: 'Backend ativo e saudável!',
      },
    },
  })
  getInfo() {
    return {
      name: 'HeroForce API',
      version: '1.0.0',
      message: 'Backend ativo e saudável!',
    };
  }
}
