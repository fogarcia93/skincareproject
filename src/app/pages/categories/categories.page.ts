import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Categories } from 'src/app/models/categories';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: Categories[];

  constructor(private _categoriesService: CategoriesService) { 
    this.categories = [];
  }

  ngOnInit() {
    this._categoriesService.getCategories().subscribe(response => {
      this.categories = response;
    });
  }

  
  viewProduct(id: string){
    console.log(id);
  }

}
