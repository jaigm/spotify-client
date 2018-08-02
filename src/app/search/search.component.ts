import {Component, OnInit} from '@angular/core';
import {SearchService} from '../service/search.service';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-root',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  queryField: FormControl = new FormControl();
  albums: any[];
  firstTime = true;

  constructor(public searchService:  SearchService) {
  }

  ngOnInit(): void {
    this
      .queryField
      .valueChanges
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(queryField => this.getFirstPageOfAlbums(queryField));
  }

  getFirstPageOfAlbums(query: string) {
    if (query === '') {
      return;
    }

    this.firstTime = false;
    this.searchService.getAlbums(query, 1).subscribe((response: any) => {
      this.albums = response.albums.items;
    });
  }
}
