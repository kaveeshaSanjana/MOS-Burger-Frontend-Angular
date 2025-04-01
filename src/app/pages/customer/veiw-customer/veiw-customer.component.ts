import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Customer from '../../../model/Customer';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-veiw-customer',
  imports: [RouterLink,NgFor],
  templateUrl: './veiw-customer.component.html',
  styleUrl: './veiw-customer.component.css'
})
export class VeiwCustomerComponent {
constructor(protected http:HttpClient ){}

  public customers: Customer[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;


  ngOnInit(): void {
      this.loadCustomers();
  }

  loadCustomers() {
   this.http.get<Customer[]>("http://localhost:8080/api/customer/get-all").subscribe(data =>{
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
