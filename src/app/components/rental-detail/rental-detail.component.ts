import { Component, OnInit } from '@angular/core';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentalDetailService } from 'src/app/services/rental-detail.service';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css']
})
export class RentalDetailComponent implements OnInit {

  rentals:RentalDetail[]=[]
  dataLoaded=false;

  constructor(private rentalDetailService:RentalDetailService) { }

  ngOnInit(): void {
    this.getRentals();
  }

  getRentals()
  {
    this.rentalDetailService.getRentals().subscribe(response=>{
        this.rentals = response.data
        this.dataLoaded = true;
      })
  }
}
