import { LOGIN_QUERY, ME_DATA_QUERY } from '@graphql/operations/query/user';
import { Injectable } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import {map} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { ISession, IMeData } from '../interfaces/session.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService{

  accessVar = new Subject<IMeData>();
  accessVar$ = this.accessVar.asObservable();

  constructor(apollo: Apollo) {
    super(apollo);
  }
  updateSession(newValue: IMeData){
    this.accessVar.next(newValue);
  }
  start() {
    if (this.getSession() !== null) {
      this.getMe().subscribe((result: IMeData ) => {
        if (!result.status) {
          this.resetSession();
          return;
        }
        this.updateSession(result);
      });
      console.log('sesion  iniciada');
      return;
    }
    this.updateSession({
      status: false
    });
    console.log('sesion no iniciada');
  }

  login(email: string, password: string){
    return this.get(LOGIN_QUERY, {email, password, include: false}).pipe(
      map((result: any) => {

        return result.login;

      })
    );
  }

  getMe(){
    return this.get(ME_DATA_QUERY, {
        include: false},
        {
          headers: new HttpHeaders({
            Authorization: this.getSession().token
          })
        }).pipe(map((result: any) => {
        return result.me;
    }));
  }

  setSession(token: string, expriesTimeInHours = 24) {
  const date = new Date();


  date.setHours(date.getHours() + expriesTimeInHours);

  const session: ISession = {
    expiresIn: new Date(date).toISOString(),
    token
  };

  localStorage.setItem('session', JSON.stringify(session));
  }

  getSession(): ISession{
    return JSON.parse(localStorage.getItem('session'));
  }

  resetSession(){
    localStorage.removeItem('session');
    this.updateSession({status: false});
  }
}
