import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { STATUS } from '../constants/status.constant';

@Component({
  selector: 'app-arc',
  templateUrl: './arc.component.html',
  styleUrls: ['./arc.component.scss'],
})
export class ArcComponent implements OnInit, OnChanges {
  @Input() critical: number = 10;
  @Input() low: number = 15;
  @Input() full: number = 50;
  @Input() current: number = 50;
  @Input() unit: string = 'cans';
  readonly status: typeof STATUS = STATUS;

  currentStatus = STATUS.CRITICAL;

  get criticalDotPercentage(): string {
    return `${Math.round(this.updateCriticalPercentage()).toLocaleString()}%`;
  }

  get lowDotPercentage(): string {
    return `${Math.round(this.updateLowPercentage()).toLocaleString()}%`;
  }

  get currentChartValue(): string {
    return `${Math.round(this.updateCurrentPercentage()).toLocaleString()}%`;
  }

  constructor(
    private _host: ElementRef<HTMLElement>,
    private _cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // setTimeout(() => {
    //   let interval: any = null;
    //   let value = this.current;
    //   interval = setInterval(() => {
    //     if (value <= 0) {
    //       clearInterval(interval);
    //     } else {
    //       value -= 1;
    //       this.current = value;
    //     }
    //   }, 200);
    // }, 2000);
    this.updateChart();
  }

  ngOnChanges(): void {
    this.updateChart();
  }

  updateChart(): void {
    const critical = this.updateCriticalPercentage();
    const low = this.updateLowPercentage();
    const current = this.updateCurrentPercentage();
    let circleFull = 0;
    let circleLow = 0;
    let circleCritical = 0;
    if (current <= critical) {
      circleFull = 0;
      circleLow = 0;
      circleCritical = Math.round(current);
      this.currentStatus = STATUS.CRITICAL;
    } else if (critical < current && current <= low) {
      circleFull = 0;
      circleLow = Math.round(current);
      circleCritical = Math.round(critical);
      this.currentStatus = STATUS.LOW;
    } else {
      circleFull = Math.round(current);
      circleLow = Math.round(low);
      circleCritical = Math.round(critical);
      this.currentStatus = STATUS.FULL;
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
    this._cdRef.detectChanges();
  }

  updateCurrentPercentage(): number {
    let value = 0;
    if (this.full > 0) {
      value = (this.current * 100) / this.full;
    }
    if (value > 100) value = 100;
    if (value < 0) value = 0;
    return value;
  }

  updateCriticalPercentage(): number {
    let value = 0;
    if (this.full > 0) {
      value = (this.critical * 100) / this.full;
    }
    if (value > 100) value = 100;
    if (value < 0) value = 0;
    return value;
  }

  updateLowPercentage(): number {
    let value = 0;
    if (this.full > 0) {
      value = (this.low * 100) / this.full;
    }
    if (value > 100) value = 100;
    if (value < 0) value = 0;
    return value;
  }
}
