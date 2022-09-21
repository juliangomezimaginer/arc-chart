import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-arc',
  templateUrl: './arc.component.html',
  styleUrls: ['./arc.component.scss'],
})
export class ArcComponent implements OnInit {
  @Input() critical: number = 5;
  @Input() low: number = 30;
  @Input() full: number = 50;
  @Input() current: number = 50;
  @Input() unit: string = 'cans';

  private _lastCriticalPercentage = 0;
  private _lastLowPercentage = 0;
  private _lastCurrentPercentage = 0;

  get criticalDotPercentage(): string {
    return `${Math.round(this.updateCriticalPercentage()).toLocaleString()}%`;
  }

  get lowDotPercentage(): string {
    return `${Math.round(this.updateLowPercentage()).toLocaleString()}%`;
  }

  get currentChartValue(): string {
    return `${Math.round(this.updateCurrentPercentage()).toLocaleString()}%`;
  }

  constructor(private _host: ElementRef<HTMLElement>) {}

  ngOnInit(): void {}

  updateChart(): void {
    const critical = this._lastCriticalPercentage;
    const low = this._lastLowPercentage;
    const current = this._lastCurrentPercentage;
    let circleFull = 0;
    let circleLow = 0;
    let circleCritical = 0;
    if (current < critical) {
      circleFull = 0;
      circleLow = 0;
      circleCritical = Math.round(current);
    } else if (critical <= current && current < low) {
      circleFull = 0;
      circleLow = Math.round(current);
      circleCritical = Math.round(critical);
    } else {
      circleFull = Math.round(current);
      circleLow = Math.round(low);
      circleCritical = Math.round(critical);
    }
    const criticalDot = Math.round(critical);
    const lowDot = Math.round(low);
    this._host.nativeElement.style.setProperty(
      '--full-value',
      circleFull.toLocaleString()
    );
    this._host.nativeElement.style.setProperty(
      '--low-value',
      circleLow.toLocaleString()
    );
    this._host.nativeElement.style.setProperty(
      '--critical-value',
      circleCritical.toLocaleString()
    );
    this._host.nativeElement.style.setProperty(
      '--critical-dot-value',
      criticalDot.toLocaleString()
    );
    this._host.nativeElement.style.setProperty(
      '--low-dot-value',
      lowDot.toLocaleString()
    );
  }

  updateCurrentPercentage(): number {
    let value = 0;
    if (this.full > 0) {
      value = (this.current * 100) / this.full;
    }
    if (value > 100) value = 100;
    if (value < 0) value = 0;
    this._lastCurrentPercentage = value;
    this.updateChart();
    return value;
  }

  updateCriticalPercentage(): number {
    let value = 0;
    if (this.full > 0) {
      value = (this.critical * 100) / this.full;
    }
    if (value > 100) value = 100;
    if (value < 0) value = 0;
    this._lastCriticalPercentage = value;
    this.updateChart();
    return value;
  }

  updateLowPercentage(): number {
    let value = 0;
    if (this.full > 0) {
      value = (this.low * 100) / this.full;
    }
    if (value > 100) value = 100;
    if (value < 0) value = 0;
    this._lastLowPercentage = value;
    this.updateChart();
    return value;
  }
}
