import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  @Input() todo: any;
  @Input() user: any;
  @Output() deletePost: EventEmitter<string> = new EventEmitter();
  @Output() updateModal : EventEmitter<any> = new EventEmitter();

  environment = environment.apiUrl;

  constructor( private router: Router,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
  }


  onSelect(){
    this.router.navigate([this.todo.id], {relativeTo: this.route})
  }

  onDelete(id: string){
    this.deletePost.emit(id)
  }

  openUpdate(post: any){
    this.updateModal.emit(post);
  }
}
