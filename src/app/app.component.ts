import { Component, Renderer2 } from '@angular/core';
import { UtilServiceService } from './util-service.service';
import recipes from 'src/assets/recipes.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private renderer: Renderer2) { }

  darkMode = true;

  title = 'logi.tools';

  util = new UtilServiceService
  data!: any[];
  items: any[] = [];
  quantities: any[] = [];
  processings: any[] = [];

  formSubmitted = false;
  selectedItem!: string;
  selectedProcess!: string;
  selectedQuantity!: number;
  outputNumber: number = 1;

  //TODO: Add error checking on quaity. Add cookie for night mode. 
  ngOnInit() {
    this.selectedQuantity = 1;
    recipes['items'].forEach(item => {
      this.items.push(this.util.capitalizeFirstLetter(item['name'].toLowerCase()));
    });
    this.items.sort();
  }

  possibleProcesses: any = {};
  timeToMake!: string;
  resourcesPerItem: string = '';
  outputPerItem: string = '';
  quantity: number = 1;
  selectedItems: { totalRuns: string, item: string, processing: string, time: string, resources: string, output: string }[] = [];

  onItemSelect() {
    if (this.selectedItem) {
      this.selectedProcess = '';

      // Reassign to empty array. Otherwise data is saved across selections.
      this.processings = []

      recipes['items'].forEach(item => {
        if (item['name'] === this.selectedItem.toLowerCase()) {
          this.possibleProcesses = item['processes'];
          item['processes'].forEach(e => {
            this.processings.push(this.util.capitalizeFirstLetter(e['name'].toLowerCase()));
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
    if (this.selectedQuantity === null || this.selectedQuantity <= 0) {
      this.selectedQuantity = 1;
    }
    if (this.selectedItem != '' && this.selectedProcess != '') {
      this.formSubmitted = true;
      let totalTimes: number = 1;
      this.possibleProcesses.forEach((element: any) => {
        if (this.selectedProcess.toLowerCase() === element['name']) {
          this.timeToMake = element['time'];
          for (let mat in element['output']) {
            if (this.selectedItem.toLowerCase() === mat) {
              this.outputNumber = parseInt(element['output'][mat]);
              totalTimes = this.util.getOutputTotal(this.outputNumber, this.selectedQuantity);
            }
            this.outputPerItem += this.util.capitalizeFirstLetter(mat) + ':\t ' + Number(element['output'][mat] * totalTimes).toLocaleString() + '<br>';
          }
          for (let mat in element['input']) {
            this.resourcesPerItem += this.util.capitalizeFirstLetter(mat) + ':\t ' + Number(element['input'][mat] * totalTimes).toLocaleString() + '<br>';
          }
        }
      });

      const newItem = {
        totalRuns: totalTimes.toLocaleString(), item: this.selectedItem, processing: this.selectedProcess,
        time: this.util.convertTime(this.timeToMake as any * totalTimes), resources: this.resourcesPerItem, output: this.outputPerItem
      };

      this.selectedItems.push(newItem);
      this.selectedItem = '';
      this.selectedProcess = '';
      this.timeToMake = '';
      this.resourcesPerItem = '';
      this.outputPerItem = '';
      this.selectedQuantity = 1;
    }
  }

  removeItem(index: number) {
    this.selectedItems.splice(index, 1);
  }

  onlyNumber() {
    console.log(this.selectedQuantity)
    if (this.selectedQuantity === null) {
      console.log("nulled out")

    }
    else {

    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }


}
