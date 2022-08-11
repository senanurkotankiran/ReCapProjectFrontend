import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[] = [];
  dataLoaded = false;
  filterText="";
  
  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private cartService:CartService) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }else if(params["brandId"] && params['colorId'] && params['colorId'] && params['minDailyPrice'] && params['maxDailyPrice']){
        
            this.getFilteredCars(params["brandId"], params['colorId'],params['minDailyPrice'],params['maxDailyPrice']);
      }
      else{
        this.getCars();
      }


    })
  }


  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    });
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    });
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    });
  }



  getCarDetailsByBrandAndColor(brandId: number, colorId: number) {
    this.carService
      .getCarDetailsByBrandAndColor(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
      });
  }

  addToCart(car:Car){
    this.toastrService.success("Sepete eklendi",car.carName)
    this.cartService.addToCart(car);
  }

  getFilteredCars(brandId:number, colorId:number, minDailyPrice:number, maxDailyPrice:number){
      this.carService.getFilteredCars(brandId, colorId, minDailyPrice, maxDailyPrice).subscribe((response) => {
         this.cars = response.data;
         console.log(response.data);
          
       });
     }

}
