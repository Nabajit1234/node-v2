import { Body, Controller, Post, Res } from '@nestjs/common';
import { CalcService } from './calc.service';
import { CalcDto } from './calc.dto';
import { Response } from 'express';

@Controller('calc')
export class CalcController {
  constructor(private readonly calcService: CalcService) {}

  @Post('/')
  calc(@Res() res: Response, @Body() calcBody: CalcDto) {
    const result = this.calcService.calculateExpression(calcBody);
    if(result.status === "success") {
      res.status(201).json({result: result.data})
    } else {
      res.status(400).json({
        statusCode: 400,
        message: "Invalid expression provided",
        error: "Bad Request"
      })
    }
  }
}
