import {Component, OnInit} from '@angular/core';
import {DataserviceService} from './services/dataservice.service'
import {HeaderComponent} from './components/header/header.component'
import {ModalComponent} from './components/modal/modal.component'
import {MatDialog, MatDialogRef} from '@angular/material';
import { config } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  transactions:any;
  Invoices:any=[];
  invoiceTotal:number=0;  

  constructor(dataService:DataserviceService,public dialog:MatDialog){
    
    //Call the getJson method to get tback result in json
    this.transactions=JSON.parse(dataService.getJson())
    
      
  }

  ngOnInit(){
    //called after the constructor and called  after the first ngOnChanges() 
  }

  toggleSelection(transaction){
    transaction.isRowSelected = !transaction.isRowSelected;      
  }

  calculateGrandTotal(){
    
    this.Invoices=[];
    var Invoices:any=[]
    var selectedTransactions:any=[];
    for(var i = 0; i < this.transactions.length; i++){
      if(this.transactions[i].isRowSelected === true){        
        selectedTransactions.push(this.transactions[i])
      }
    }

    //Get the unique Products
    var flags = [], output = [], l = selectedTransactions.length;
    for( var i=0; i<l; i++) {
        if( flags[selectedTransactions[i].product]) continue;
        flags[selectedTransactions[i].product] = true;
        output.push(selectedTransactions[i].product);
    }

    //Aggregate based on product name
    var counter:number=0;
    output.forEach(pName => {
      counter++;
      var unitPrice=0
      var quantity=0
      var taxAmount=0
      var totalAmount=0

      selectedTransactions.forEach(transaction => {
        if(transaction.product==pName){
          unitPrice=transaction.unitPrice
          quantity+=transaction.quantity
        }
      });
      taxAmount=(unitPrice*quantity)*0.06  //Assuming 6% tax
      totalAmount=taxAmount+(unitPrice*quantity);
      Invoices.push(new InvoiceRow(counter,pName,quantity,unitPrice,taxAmount,totalAmount))
      
    });
    this.Invoices=Invoices
    this.calculateInvoiceTotal()
  }

  calculateInvoiceTotal(){
    this.invoiceTotal=0
    var total=0
    this.Invoices.forEach(row => {
      
      total+=row.total
    });
    this.invoiceTotal=total;
    console.log(this.Invoices)
    this.dialog.open(ModalComponent,{data:{Invoices:this.Invoices,total:total}});
  }
  
   
}

class InvoiceRow{
  public no:number;
  public product:string;
  public quantity:number;
  public unitPrice:number;
  public taxAmount:number;
  public total:number;
  constructor(no:number,product:string,quantity:number,unitPrice:number,taxAmount:number,total:number){
    this.no=no
    this.product=product
    this.quantity=quantity
    this.unitPrice=unitPrice
    this.taxAmount=taxAmount
    this.total=total 

  }
}


