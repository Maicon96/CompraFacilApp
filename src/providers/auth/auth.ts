import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpResponse, HttpErrorResponse, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ModalController, AlertController } from 'ionic-angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  conexao = true;
  loading: any;

  constructor(public modalCtrl: ModalController, public alertCtrl: AlertController) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("chegou no interceptor");
      
    let authReq = req.clone({});

      /*let authReq = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE')          
            .append('Access-Control-Allow-Headers', 'Accept,Accept-Language,Content-Language,Content-Type')
            .append('Access-Control-Expose-Headers', 'Content-Length,Content-Range') });  */    

        return next.handle(authReq);
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};

