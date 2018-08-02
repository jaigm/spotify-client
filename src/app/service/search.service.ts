import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class SearchService {
  apiUrl = 'https://javi-spotify-server.herokuapp.com';

  constructor(public httpClient: HttpClient) {}

  getAlbums(text: string, page: number) {
    return this.httpClient.get(`${this.apiUrl}/search/albums?query=${text}&page=${page}&pageSize=50`);
  }
}
