import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilServiceService {

  constructor() { }

  public capitalizeFirstLetter(str: string): string {
    const words = str.toLowerCase().split(' ');
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(" ");

  }

  public getOutputTotal(out: number, quantity: number) {
    return Math.ceil(quantity / out);
  }

  public convertTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`;
    }
    else if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    }
    else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    else {
      return `${seconds}s`;
    }

  }


}
