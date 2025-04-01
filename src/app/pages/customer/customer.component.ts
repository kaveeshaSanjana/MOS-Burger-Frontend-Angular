import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-customer',
  imports: [NgFor , FormsModule , RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {

  constructor(protected http:HttpClient ){}

  public customers: any[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;


  ngOnInit(): void {
      this.loadCustomers();
  }

  loadCustomers() {
   this.http.get<any[]>("http://localhost:8080/api/customer/get-all").subscribe(data =>{
     this.customers = data;
   });
  }

  deleteCustomer(email:string){
    this.http.delete(`http://localhost:8080/api/customer/delete/${email}`).subscribe({
      next: () => {
        this.successMessage = 'Customer deleted successfully!';
        this.errorMessage = null;
        this.loadCustomers(); 
      },
      error: (err) => {
        this.errorMessage = `Failed to delete customer. Error: ${err.message}`;
        this.successMessage = null;
      }
    });
  }
}
