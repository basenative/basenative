import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Revocation } from '@greenput/domain';

@Component({
  selector: 'section[greenput-revocation-history]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './revocation-history.component.html',
  styleUrl: './revocation-history.component.scss',
})
export class RevocationHistoryComponent {
  history = input.required<Revocation[]>();
}
