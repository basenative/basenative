import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ConsentReceipt } from '@greenput/domain';

@Component({
  selector: 'article[greenput-receipt-viewer]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receipt-viewer.component.html',
  styleUrl: './receipt-viewer.component.scss',
})
export class ConsentReceiptViewerComponent {
  receipt = input.required<ConsentReceipt>();

  shortHash = computed(() => this.receipt().hash.substring(0, 16) + '...');

  acceptedPurposes = computed(() => {
    return Object.entries(this.receipt().purposes)
      .filter(([, status]) => status === 'granted')
      .map(([key]) => ({ key }));
  });

  deniedPurposes = computed(() => {
    return Object.entries(this.receipt().purposes)
      .filter(([, status]) => status === 'denied')
      .map(([key]) => ({ key }));
  });

  copyHash() {
    navigator.clipboard.writeText(this.receipt().hash);
  }
}
