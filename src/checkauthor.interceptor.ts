import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CheckauthorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log('before', request.body);
    if(!request.body.author){
      request.body.author = 'Dim';
      console.log('after', request.body);
      
    }
    
    return next.handle();
  }
}
