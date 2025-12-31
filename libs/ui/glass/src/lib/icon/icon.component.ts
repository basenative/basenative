import {
  Component,
  Input,
  OnInit,
  inject,
  numberAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconService } from './icon.service';
import { Observable } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'span[icon]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
})
export class IconComponent implements OnInit {
  private iconService = inject(IconService);

  @Input({ required: true }) name!: string;
  @Input({ transform: numberAttribute }) size = 24;

  icon$!: Observable<SafeHtml>;

  ngOnInit() {
    this.icon$ = this.iconService.getIcon(this.name);
  }
}
