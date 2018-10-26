import { Component, OnInit } from '@angular/core';
import { HttpCallService } from '../../services/http-call.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public articles;

  constructor(private httpCall: HttpCallService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getRecipes();

  }

  getRecipes() {
    this.httpCall.getArticles().subscribe(
      data => {
        console.log(data)
        this.articles = data;
      },
      err => console.log(err),
      () => console.log('sended the request')
    )
  }
}
