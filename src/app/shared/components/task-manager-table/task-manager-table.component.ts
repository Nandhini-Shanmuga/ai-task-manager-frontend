import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'app-task-manager-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-manager-table.component.html',
  styleUrl: './task-manager-table.component.css'
})
export class TaskManagerTableComponent {
  @Input() tableHeader: any;
  @Input() tableData: any;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() view = new EventEmitter();
  @Output() updateStatus = new EventEmitter();
  isLoading = input(false);
  
}

