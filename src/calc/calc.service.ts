import { Injectable } from '@nestjs/common';
import { CalcDto } from './calc.dto';

export interface ClacServiceResponse {
  status: "success" | "failure";
  data: number | null;
}

@Injectable()
export class CalcService {

  calculateExpression(calcBody: CalcDto): ClacServiceResponse {
    try {
      const operators = {
        "+": (a: number, b: number) => a+b,
        "-": (a: number, b: number) => a-b,
        "*": (a: number, b: number) => a*b,
        "/": (a: number, b: number) => a/b,
      }
      let elements = calcBody.expression.split("")
      if(operators[elements[0]]) {
        return {
          status: "failure",
          data: null
        }
      } else if(operators[elements[elements.length-1]]) {
        return {
          status: "failure",
          data: null
        }
      }
      let value: number
      for(let i=1; i<elements.length-1; i++) {
        if(!operators[elements[i]]) continue
        if(operators[elements[i]] && value === undefined) {
          value = operators[elements[i]](Number(elements[i-1]), Number(elements[i+1]))
        } else {
          value = operators[elements[i]](Number(value), Number(elements[i+1]))
        }
      }
      return {
        status: "success",
        data: value
      }
    } catch (error) {
      return {
        status: "failure",
        data: null
      }
    }
  }
}
