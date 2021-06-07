import {Injectable} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {SpinnerComponent} from '../components/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay) {

  }

  show(): void {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }
    const spinnerOverlayPortal = new ComponentPortal(SpinnerComponent);
    const comp = this.overlayRef.attach(spinnerOverlayPortal);
  }

  hide(): void {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
