import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpCallService } from 'src/app/services/http-call.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public editForm: FormGroup;
  public article;
  public date;
  public error;
  public token;
  public id = this.route.snapshot.paramMap.get('id');
  loading = false;
  submitted = false;
  constructor(
    private httpCall: HttpCallService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    localStorage.getItem('token') ? this.token = localStorage.getItem('token') : this.router.navigateByUrl('/login')
    
    this.getArticle(this.id);
    
  }

  getArticle(id) {
    this.httpCall.getArticle(id).subscribe(
      data => {
        console.log(data)
        this.article = data;
        var myDate = new Date(this.article.data.attributes.created * 1000);
        this.date = myDate.toUTCString()
        



        this.editForm = this.formBuilder.group({
          body: [`${this.article.data.attributes.body.value}`, Validators.required],
          newTitle: [`${this.article.data.attributes.newTitle}`, Validators.required],
        });


      },
      err => console.log(err),
      () => console.log('sended the request')
    )
  }
  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }


  onSubmit() {
    this.httpCall.edit(this.f.newTitle.value, this.f.body.value, this.token, this.id).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)

    );
  }

  handleResponse(data) {
    console.log(data)
    this.router.navigateByUrl('/backOffice')
  }


  handleError(error) {
    console.log('this is the error', error.error)
    this.error = error.error.error;
  }






}


