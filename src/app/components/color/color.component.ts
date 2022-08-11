import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors: Color[] = [];
  currentColor :Color;
  emptyColor:Color;
  dataLoaded = false;
  filterColor="";
  colorForm:FormGroup;
  isAllColorsClicked:boolean = true;


  constructor(private colorService:ColorService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.colorForm  = this.formBuilder.group({
      color:[null]
    });
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
      this.dataLoaded = true;
    })
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

}
