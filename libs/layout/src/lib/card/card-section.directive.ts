import { Directive } from '@angular/core';

@Directive({
  selector: 'header[cardHeader]',
  standalone: true,
  host: { class: 'semantic-card-header' },
})
export class CardHeaderDirective {}

@Directive({
  selector: 'section[cardContent], div[cardContent]',
  standalone: true,
  host: { class: 'semantic-card-content' },
})
export class CardContentDirective {}

@Directive({
  selector: 'footer[cardFooter]',
  standalone: true,
  host: { class: 'semantic-card-footer' },
})
export class CardFooterDirective {}
