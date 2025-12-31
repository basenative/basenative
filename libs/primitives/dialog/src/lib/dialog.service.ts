import {
  Injectable,
  TemplateRef,
  ViewContainerRef,
  inject,
  ComponentRef,
  EnvironmentInjector,
  createComponent,
  ApplicationRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private document = inject(DOCUMENT);
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);

  // Keep track of open dialogs
  private openDialogs: HTMLElement[] = [];

  open(template: TemplateRef<unknown>, vcr?: ViewContainerRef) {
    // Basic implementation: Create a container div, render template into it, append to body
    // In a real implementation, we would use Portal and Overlay logic.
    // For this primitive, we'll do it manually to verify the pattern.

    // 1. Create Overlay Container
    const overlay = this.document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.zIndex = '1000';
    overlay.style.background = 'rgba(0,0,0,0.5)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';

    // 2. Render Template
    // Note: We need a generic ViewContainerRef or createEmbeddedView on one passed in.
    // If not passed, we can't easily access the "context" vcr.
    // Alternatively, we use createEmbeddedView from the template itself if we had context?
    // Actually template.createEmbeddedView returns an EmbeddedViewRef.
    const view = template.createEmbeddedView(null);
    view.detectChanges(); // Initial change detection

    // 3. Attach to Overlay
    view.rootNodes.forEach((node) => overlay.appendChild(node));

    // 4. Attach Overlay to Body
    this.document.body.appendChild(overlay);
    this.openDialogs.push(overlay);

    // 5. Managing Lifecycle
    // Should return a reference to close it.
    return {
      close: () => {
        if (this.openDialogs.includes(overlay)) {
          this.document.body.removeChild(overlay);
          view.destroy();
          this.openDialogs = this.openDialogs.filter((d) => d !== overlay);
        }
      },
    };
  }
}
