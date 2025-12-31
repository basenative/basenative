import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'article[card], div[card]',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.semantic-card]': 'true',
    '[class.elevated]': 'variant === "elevated"',
    '[class.outlined]': 'variant === "outlined"',
  },
})
export class CardComponent {
  @Input() variant: 'elevated' | 'outlined' | 'ghost' = 'outlined';
}
