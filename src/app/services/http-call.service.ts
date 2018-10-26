import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpCallService {

  private baseUrl = 'http://localhost:8080/jsonapi'
  constructor(private http: HttpClient) { }


  getArticles() {
    return this.http.get(`${this.baseUrl}/node/article?include=field_image`)
  }
  getArticle(id) {
    return this.http.get(`${this.baseUrl}/node/article/${id}/?include=field_image`)
  }
}
