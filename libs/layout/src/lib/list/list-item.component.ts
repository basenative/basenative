import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'li[item], a[item], button[item]',
  standalone: true,
  templateUrl: './list-item.component.html',
  styleUrls: ['./list.component.css'], // Share styles with list
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'semantic-list-item' },
})
export class ListItemComponent {}
