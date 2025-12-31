import {
  Component,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonComponent,
  IconComponent,
  LogoComponent,
  ThemeSelectorComponent,
} from '@basenative/ui/glass';
import {
  CardComponent,
  CardHeaderDirective,
  CardContentDirective,
  CardFooterDirective,
  ListComponent,
  ListItemComponent,
} from '@basenative/layout';
import { InputComponent, InputDirective } from '@basenative/forms';
import { VisuallyHiddenComponent } from '@basenative/primitives/a11y';
import { FocusTrapDirective } from '@basenative/primitives/focus';
import { Anchor, Anchored } from '@basenative/primitives/anchor';
import { PortalDirective } from '@basenative/primitives/portal';
import { DialogComponent } from '@basenative/primitives/dialog';
import { ScrollDirective } from '@basenative/primitives/scroll';

@Component({
  selector: 'docs-preview',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    IconComponent,
    LogoComponent,
    ThemeSelectorComponent,
    CardComponent,
    CardHeaderDirective,
    CardContentDirective,
    CardFooterDirective,
    ListComponent,
    ListItemComponent,
    InputComponent,
    InputDirective,
    VisuallyHiddenComponent,
    FocusTrapDirective,
    Anchor,
    Anchored,
    PortalDirective,
    DialogComponent,
    ScrollDirective,
  ],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PreviewComponent {
  component = input.required<string>();
}
