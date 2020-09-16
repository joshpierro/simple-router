import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stop } from '../models/stop';

@Component({
  selector: 'app-stops',
  templateUrl: './stops.component.html',
  styleUrls: ['./stops.component.css']
})
export class StopsComponent implements OnInit {

  @Input() stops: Stop[] = [];
  @Input() directions: string[] = [];
  @Output() deleteStopEvent = new EventEmitter<Stop>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteStop(stop: Stop): void {
    this.deleteStopEvent.emit(stop);
  }

}
