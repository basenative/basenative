import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DataCategory } from '@greenput/domain';

@Component({
  selector: 'article[greenput-data-category]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-category.component.html',
  styleUrl: './data-category.component.scss',
})
export class DataCategoryExplainerComponent {
  category = input.required<DataCategory>();
}
