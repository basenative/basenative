import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Configurator } from '@basenative/ui-glass';

@Component({
  selector: 'article[tokens-page]',
  standalone: true,
  imports: [CommonModule, Configurator],
  templateUrl: './tokens.html',
  styleUrl: './tokens.css',
})
export class TokensPage {
  // Logic delegated to Configurator component
}
