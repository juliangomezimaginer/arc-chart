import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-arc',
  templateUrl: './arc.component.html',
  styleUrls: ['./arc.component.scss'],
})
export class ArcComponent implements OnInit {
  @Input() critical: number = 10;
  @Input() low: number = 15;
  @Input() full: number = 10;
  @Input() current: number = 50;
  @Input() unit: string = 'cans';

  get criticalDotValue(): string {
    return this.updateCriticalDotValue();
  }

  get lowDotValue(): string {
    return `${(this.low * 100) / this.current}%`;
  }

  constructor() {}

  ngOnInit(): void {}

  updateCriticalDotValue(): string {
    return `${(this.critical * 100) / this.current}%`;
  }
}
