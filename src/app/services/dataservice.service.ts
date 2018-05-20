import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  Transactions:Array<Transaction>=new Array<Transaction>()
  constructor() {

    //Populate the Transactions with dummy data
    this.Transactions.push(new Transaction(0,'Michele','Nagase','Espreso con Panna',10,3.25))
    this.Transactions.push(new Transaction(1,'Yoshi','Rossi','Green Tea',3,1.50))
    this.Transactions.push(new Transaction(2,'Shelley','Winkler','Caffe Americano',6,2.50))
    this.Transactions.push(new Transaction(3,'Shelley','Fuller','Cappuccino',9,5.00))
    this.Transactions.push(new Transaction(4,'Petra','Davolio','Black Tea',9,2.25))
    this.Transactions.push(new Transaction(5,'Antoni','Peterson','Espreso Truffle',5,1.75))
    this.Transactions.push(new Transaction(6,'Regina','Davolio','Espreso Truffle',2,1.75))
    this.Transactions.push(new Transaction(7,'Lars','Burke','Doubleshot Espreso',9,3.30))
    this.Transactions.push(new Transaction(8,'Peter','Ohno','Cappuccino',3,5.00))
    this.Transactions.push(new Transaction(9,'Antoni','Saavedra','Camel Latte',9,3.80))

   }

   getJson(){
    //Function to get json data
    //Ideally it should connect to a web service
    return JSON.stringify(this.Transactions)
  }
}


class Transaction {
  public isRowSelected:boolean=false;
  public id:number;
  public firstName:string;
  public lastName:string;
  public product:string;
  public quantity:number;
  public unitPrice:number; 
  

  constructor(id:number,firstName:string,lastName:string,product:string,quantity:number,unitPrice:number) {
    this.id=id;
    this.firstName=firstName;
    this.lastName=lastName;
    this.product=product;
    this.quantity=quantity;
    this.unitPrice=unitPrice;
  }
}