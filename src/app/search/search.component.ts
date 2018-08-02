import {Component, HostListener, OnInit} from '@angular/core';
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
  currentPage;
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
    this.currentPage = 1;
    this.searchService.getAlbums(query, this.currentPage).subscribe((response: any) => {
      this.albums = response.albums.items;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const d = document.documentElement;
    const offset = d.scrollTop + window.innerHeight;
    const height = d.offsetHeight;

    if (offset === height) {
      this.currentPage += 1;
      this.searchService.getAlbums(this.queryField.value, this.currentPage).subscribe((response: any) => {
        this.albums = this.albums.concat(response.albums.items);
      });
    }
  }
}
