import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'article[strategy-page]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './strategy.html',
  styleUrl: './strategy.css',
})
export class StrategyPage {}
