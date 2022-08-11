import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {
  carFilterForm: FormGroup;
  colors: Color[];
  brands: Brand[];
  car:Car[];
  allFilterParamatersEntered: boolean =false;
  brandId:number;
  colorId:number;
  cars:Car[];

  currentColor :Color;
  emptyColor:Color;
  dataLoaded = false;
  filterColor="";
  colorForm:FormGroup;
  isAllColorsClicked:boolean = true;
 
  currentBrand :Brand;
  emptyBrand:Brand;
  filterBrand="";



  constructor(private formBuilder: FormBuilder,
    private brandService: BrandService,
    private colorService: ColorService,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.carFilterForm = this.formBuilder.group({
      brand: new FormControl(null, [
        Validators.required,
      ]),
      color: new FormControl(null, [
        Validators.required,
      ]),
      minimumDailyPrice: new FormControl(null, [
        Validators.required,
      ]),
      maximumDailyPrice: new FormControl(null, [
        Validators.required,
      ])
    });


  }


  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
    
  }

  clearCurrentBrand(){
    this.currentBrand=this.emptyBrand;
  }
  
  getCurrentBrandClass(brand:Brand){  
    if(brand==this.currentBrand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }

  }

  getAllBrandClass(){  
    if(!this.currentBrand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }

  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  setCurrentColor(color:Color){
    this.currentColor = color;
    this.isAllColorsClicked=false;
    
  }

  clearCurrentColor(){
    this.currentColor=this.emptyColor;
  }
  
  getCurrentColorClass(color:Color){  
    if(color==this.currentColor  && !this.isAllColorsClicked){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }

  }

  getAllColorClass(){  
    if(!this.currentColor){
      return "list-group-item active"
    }else if(this.isAllColorsClicked){
      return "list-group-item active";
    }else{
      return "list-group-item"
    }

  }

  makeAllColorsActive(){
    this.isAllColorsClicked = true;
    console.log("all cars clicked.");
    
  }
  submit() {
    console.log("Form Submitted")
    console.log(this.colorForm.value)
  }


  filter() {

    if(this.checkFilterParameters()){
      let brandId = this.carFilterForm.value.brand;
      let colorId = this.carFilterForm.value.color;
      let minDailyPrice = this.carFilterForm.value.minimumDailyPrice;
      let maxDailyPrice = this.carFilterForm.value.maximumDailyPrice;

      this.toastrService.success("Cars are filtered.", "Filter");
      this.router.navigateByUrl("/cars/getfilteredcars/" + brandId + "/" + colorId + "/" + minDailyPrice + "/" + maxDailyPrice);
      this.carFilterForm.reset();
      this.allFilterParamatersEntered = false;
    }
   
  }

  getBrand() {
    return this.carFilterForm.get('brand');
  }

  getColor() {
    return this.carFilterForm.get('color');
  }

  getMinimumDailyPrice() {
    return this.carFilterForm.get('minimumDailyPrice');
  }
  getmaximumDailyPrice() {
    return this.carFilterForm.get('maximumDailyPrice');
  }

  checkFilterParameters() {
    
    if (this.getBrand()?.valid && this.getColor()?.valid && this.getMinimumDailyPrice()?.valid && this.getmaximumDailyPrice()?.valid) {
      this.allFilterParamatersEntered = true;
      
    }

    return this.allFilterParamatersEntered;


  }


}
