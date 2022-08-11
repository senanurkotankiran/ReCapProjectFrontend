import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44351/api/';
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetail"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbybrandId?id=" + brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbycolorId?id=" + colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetailsByBrandAndColor(
    brandId: number,
    colorId: number
  ): Observable<ListResponseModel<Car>> {
    let newPath: string = `${this.apiUrl}cars/getcardetailsbybrandandcolor?brandid=${brandId}&colorid=${colorId}`;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }


  
  getFilteredCars(brandId:number, colorId:number, minDailyPrice:number, maxDailyPrice:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "/cars/getfilteredcars"
    +"?brandId="+ brandId.toString()
    +"&colorId="+colorId.toString()  
    +"&minDailyPrice="+minDailyPrice.toString()  
    +"&maxDailyPrice="+maxDailyPrice.toString() ; 
    
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
