import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UtilServiceService } from './util-service.service';
import recipes from 'src/assets/test_recipes.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private http: HttpClient) { }

  title = 'logi.tools';

  util = new UtilServiceService
  data!: any[];
  items: any[] = [];
  quantities: any[] = [];
  processings: any[] = [];
  ngOnInit() {
    recipes["items"].forEach(item => {
      this.items.push(this.util.capitalizeFirstLetter(item["name"]))
    });
    this.items.sort();
  }


  selectedItem!: string;
  selectedProcess!: string;
  selectedQuantity!: string;
  possibleProcesses: any = {};
  timeToMake!: string;
  resourcesPerItem: string = '';
  outputPerItem: string = '';
  selectedItems: { item: string, processing: string, time: string, resources: string, output: string }[] = [];
  onItemSelect() {
    if (this.selectedItem) {
      this.selectedProcess = '';
      this.processings = []
      recipes["items"].forEach(item => {
        if (item['name'] === this.selectedItem.toLowerCase()) {
          this.possibleProcesses = item['processes'];
          item['processes'].forEach(e => {
            this.processings.push(this.util.capitalizeFirstLetter(e['name'].toLowerCase()))
          });
        }
      });
      this.processings.sort();
    }
    else {
      this.selectedProcess = '';
    }

  }
  onSubmit() {
    this.possibleProcesses.forEach((element: any) => {
      if (this.selectedProcess.toLowerCase() === element['name']) {
        this.timeToMake = element['time'];
        console.log(element['input'])
        for (let mat in element['input']) {
          this.resourcesPerItem += this.util.capitalizeFirstLetter(mat) + ':\t ' + element['input'][mat] + '\t\n'
          // console.log(mat);
          // console.log(element['input'][mat])
        }
        for (let mat in element['output']) {
          this.outputPerItem += this.util.capitalizeFirstLetter(mat) + ':\t ' + element['output'][mat] + '\t\n'
        }
        // element['input'].forEach((inputs: any) => {
        //   console.log(inputs)
        // });
      }
    });

    const newItem = {
      item: this.selectedItem, processing: this.selectedProcess,
      time: this.timeToMake, resources: this.resourcesPerItem, output: this.outputPerItem
    };
    this.selectedItems.push(newItem);
    this.selectedItem = '';
    this.selectedProcess = '';
  }
  calculateTotal() {
    console.log()
  }

  removeItem(index: number) {
    this.selectedItems.splice(index, 1);
  }

  onlyNumber() {

  }
  increment() {

  }

}
