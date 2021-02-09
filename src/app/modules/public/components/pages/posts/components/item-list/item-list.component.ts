import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  @Input() todo: any;
  @Output() deletePost: EventEmitter<string> = new EventEmitter();

  constructor( private router: Router,
    private store: Store,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
  }


  onSelect(){
    this.router.navigate([this.todo.id], {relativeTo: this.route})
  }

  onDelete(id: string){
    this.deletePost.emit(id)
  }
}
