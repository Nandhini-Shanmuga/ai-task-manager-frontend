import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  filterForm!: FormGroup;

  @Output() applyFilter = new EventEmitter<any>();
  @Output() closeFilter = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      status: [''],      // todo, completed
      priority: [''],    // low, medium, high
      
    });
  }

  onApplyFilter() {
    this.applyFilter.emit(this.filterForm.value);
  }

  onCloseFilter() {
    this.filterForm.reset();
    this.closeFilter.emit();
  }
}
