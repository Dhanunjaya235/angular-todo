import { Component,Input } from '@angular/core';
import { QuoteInterface } from '../models';

@Component({
  selector: 'todo-quote',
  standalone: true,
  imports: [],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss'
})
export class QuoteComponent {

  @Input() quote!:QuoteInterface;

  author!:string;

  handleHover(){
    this.author=this.quote.author
  }

}
