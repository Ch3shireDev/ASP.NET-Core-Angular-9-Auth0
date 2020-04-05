import { Component, OnInit } from '@angular/core';
import * as auth0 from 'auth0-js';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public message: string;


  auth0 = new auth0.WebAuth({
    clientID: 'WlQO27ycF1JOW69gs6RobcdNUffCFBtC',
    domain: 'dev-f8t1k7iq.auth0.com',
    responseType: 'token id_token',
    audience: 'https://localhost:5001',
    redirectUri: 'http://localhost:4200',
    scope: 'openid profile email read:messages'
  });

  constructor(public auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  public public() {
    this.message = '';
    this.http.get(`https://localhost:5001/api/public`)
      .subscribe(
        (data: { message }) => this.message = data.message,
        (error: { message }) => this.message = error.message
      );
  }

  public private() {
    this.message = '';
    console.log(localStorage.getItem('access_token'));
    this.http.get(`https://localhost:5001/api/private`, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
      .subscribe(
        (data: { message }) => this.message = data.message,
        (error: { message }) => this.message = error.message
      );
  }

  public login() {
    this.auth0.authorize();
  }

}
