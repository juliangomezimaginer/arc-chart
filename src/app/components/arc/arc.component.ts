import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-arc',
  templateUrl: './arc.component.html',
  styleUrls: ['./arc.component.scss'],
})
export class ArcComponent implements OnInit {
  @Input() critical: number = 10;
  @Input() low: number = 15;
  @Input() full: number = 50;
  @Input() current: number = 50;
  @Input() unit: string = 'cans';

  circleFull = 0;
  circleLow = 0;
  circleCritical = 0;

  private _lastCriticalPercentage = 0;
  private _lastLowPercentage = 0;
  private _lastFullPercentage = 0;
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

  constructor() {}

  ngOnInit(): void {}

  updateChart(): void {
    const critical = this._lastCriticalPercentage;
    const low = this._lastLowPercentage;
    const current = this._lastCurrentPercentage;
    if (current < critical) {
      this.circleFull = 0;
      this.circleLow = 0;
      this.circleCritical = Math.round(current);
    } else if (critical <= current && current < low) {
      this.circleFull = 0;
      this.circleLow = Math.round(current);
      this.circleCritical = Math.round(critical);
    } else {
      this.circleFull = Math.round(current);
      this.circleLow = Math.round(low);
      this.circleCritical = Math.round(critical);
    }
    const criticalDot = Math.round(critical);
    const lowDot = Math.round(low);
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
