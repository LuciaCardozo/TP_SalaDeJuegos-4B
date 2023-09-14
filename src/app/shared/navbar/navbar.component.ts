import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() icono:any;
  @Input() titulo:any;
  @Input() imagen:any;
  @Input() botones:any = [];
  @Input() showBack: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
