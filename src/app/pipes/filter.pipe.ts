import { Pipe, PipeTransform } from "@angular/core";
import { Restaurant } from '../models/restaurant.model';

@Pipe({
    name: "filter",
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: Restaurant[], searchString: string) {
        if (!items || !searchString || !searchString.trim()) return items;
        return items.filter(item => this.replaceAll(item.title.trim().toLowerCase(), ' ', '').indexOf(searchString) != -1);
    }

    private replaceAll(str: string, strToRep: string, replacement: string) {
        while (str.indexOf(strToRep) != -1)
            str = str.replace(strToRep, replacement);
        return str;
    }

}