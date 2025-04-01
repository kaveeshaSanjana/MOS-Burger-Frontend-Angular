import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface CartItem {
  customerEmail: string;
  productId: number;
  qty: number;
}

@Component({
  selector: 'app-product',
  imports: [CommonModule, NgFor, RouterLink ,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})



export class ProductComponent implements OnInit {
  public cart: any = [];
  public total: number = 0;
  public products: any[] = [];
  @Input() public enputEmail: string ="";
  
  constructor(protected http: HttpClient ) { }


  ngOnInit(): void {
    this.loadProducts();
    this.loadCustomerCart(this.enputEmail);
  }

  loadProducts() {
    this.http.get<any[]>("http://localhost:8080/api/product/get-all").subscribe(data => {
      console.log(data);
      this.products = data;
    })
  }

  public p: CartItem = {
    customerEmail: "",
    productId: 0,
    qty: 1
  };


  addToCart(id: number) {
    this.p.productId = id;
    this.p.customerEmail = this.enputEmail;
    this.http.post('http://localhost:8080/api/cart/save', this.p).subscribe(res => {
      console.log(res);
      this.loadCustomerCart(this.enputEmail);
    });
  }

  public loadCustomerCart(email: string) {
    if(this.enputEmail!=""){
      
    this.http.get(`http://localhost:8080/api/cart/get/${email}`).subscribe(data => {
      this.getTotal(data);
      this.cart = data;
    })
    }
  }

  private order: any = {
    email: "",
    product: {
        productId: 0,
        qty: 0
      },
    date: "",
    price:0,
    credit: 0
  }

  placeOrder() {
    let products:any[] = [{}];
    this.cart.forEach((element: { product: { productId: any; }; qty: any; }) => {
      products.push({
        productId: element.product.productId,
        qty : element.qty
      })
    });

    this.order.email = this.enputEmail;
    this.order.product = products;
    this.order.date = new Date();
    this.order.total = this.total;
    this.order.credit = (this.total *10/100);
    this.http.post('http://localhost:8080/api/order/place-order',this.order).subscribe(res=>{
      this.loadCustomerCart(this.enputEmail);
    })
  }

  getTotal(array: any) {
    this.total = 0;
    array.forEach((data: { product: any; qty: number; }) => {
      this.total += (data.product.price * data.qty);
    });
  }


}
