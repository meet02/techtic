import { Component,ViewChild,OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table'
import {MatPaginatorModule,MatPaginator} from '@angular/material/paginator';
import {MatSortModule,MatSort} from '@angular/material/sort';
import {HttpService} from './http.service'
import {config} from "./../config"
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import {FormGroup, FormControl} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['websiteId','chats','missedChats'];
  dataSource: any
  @ViewChild(MatPaginator) paginator: any
  @ViewChild(MatSort) sort: any

  campaignOne: any;
  campaignTwo: any;
 

  constructor(private toaster:Toaster,private httpService:HttpService) { 

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });

    
  }

  ngOnInit(){
    this.getData("")
    
  }

  FilterData()
  {
    console.log("this.campaignOne.value",this.campaignOne.value)
    if(this.campaignOne.value.start==null || this.campaignOne.value.end==null)
    {
      this.toaster.open({
        text: "Please Select Date",
        caption: 'Error',
        type: "danger"
      });
    }
    else{
      var dateObjStart = new Date(this.campaignOne.value.start);
      var monthStart = dateObjStart.getUTCMonth(); //months from 1-12
      var dayStart = dateObjStart.getUTCDate();
      var yearStart = dateObjStart.getUTCFullYear();

      let startDateSting=`${yearStart}-${monthStart}-${dayStart}`
      console.log("startDateSting",startDateSting);

      var dateObjEnd = new Date(this.campaignOne.value.end);
      var month2End = dateObjEnd.getUTCMonth(); //months from 1-12
      var dayEnd = dateObjEnd.getUTCDate();
      var yearEnd = dateObjEnd.getUTCFullYear();

      let endDateSting=`${yearEnd}-${month2End}-${dayEnd}`
      console.log("endDateSting",endDateSting);

      this.getData(`?startDate=${startDateSting}&endDate=${endDateSting}`)


    }
    
  }

  getData=(queryParams:any)=>{
    this.httpService.getMethod(`${config.BASE_URL}chart/date${queryParams}`).subscribe((data:any)=>{
        console.log("admin data",data)
        if(Object.keys(data.payload).length==0)
        {
          this.toaster.open({
            text: "Data Not found in Data range",
            caption: 'Error',
            type: "danger"
          });
          this.dataSource=[]
        }
        else{
          const ELEMENT_DATA: PeriodicElement[] = data.payload
          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
       

    },(err)=>{
      
        this.toaster.open({
          text: "Internal Server Error",
          caption: 'Error',
          type: "danger"
        });
      
      
  })
  
  }
}


export interface PeriodicElement {
  websiteId: string,
  chats:string,
  missedChats:string
  
}
