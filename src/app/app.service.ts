import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from './models';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  url: string = 'https://aleksandr-services-api.onrender.com';
  constructor(private http: HttpClient) {}
  get() {
    return this.http.get(this.url);
  }
  send(dto: IOrder){
    return this.http.post(this.url, dto)
  }
}
