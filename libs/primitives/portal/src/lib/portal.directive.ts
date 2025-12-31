import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  EmbeddedViewRef,
  OnDestroy,
  inject,
  ApplicationRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[portal]',
  standalone: true,
})
export class PortalDirective implements OnDestroy {
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
  private document = inject(DOCUMENT);
  private appRef = inject(ApplicationRef);
  private viewRef: EmbeddedViewRef<unknown> | null = null;

  @Input() set portal(shouldPortal: boolean) {
    if (shouldPortal) {
      this.attach();
    } else {
      this.detach();
    }
  }

  private attach() {
    if (this.viewRef) return;

    this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
    this.viewRef.detectChanges();

    // Move to body by default (can be improved to accept target)
    this.viewRef.rootNodes.forEach((node) => {
      this.document.body.appendChild(node);
    });
  }

  private detach() {
    if (!this.viewRef) return;

    this.viewRef.destroy();
    this.viewRef = null;
  }

  ngOnDestroy() {
    this.detach();
  }
}
