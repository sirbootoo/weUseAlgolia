import { Component, OnInit, AfterViewInit } from '@angular/core';
import { environment } from '../../environments/environment';

import { NgAisInstantSearch } from 'angular-instantsearch';

declare var instantsearch: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  showHeader = false;

  search: any;
  hitts:any = [];

  config:any = environment.algolia;

  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit(){}

}
