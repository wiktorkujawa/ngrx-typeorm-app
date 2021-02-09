import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  @Input() todo: any;

  constructor( private router: Router,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
  }


  onSelect(){
    this.router.navigate([this.todo.id], {relativeTo: this.route})
  }
}
