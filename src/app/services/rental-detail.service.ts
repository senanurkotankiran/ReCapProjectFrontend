import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDetailResponseModel } from '../models/rentalDetailResponse';

@Injectable({
  providedIn: 'root'
})
export class RentalDetailService {

  apiUrl='https://localhost:44351/api/Rentals/getrentaldetail'

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<RentalDetailResponseModel>{
    return this.httpClient.get<RentalDetailResponseModel>(this.apiUrl);

  }
}
