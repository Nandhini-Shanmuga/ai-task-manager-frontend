import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-pop-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-pop-up.component.html',
  styleUrl: './delete-pop-up.component.css'
})
export class DeletePopUpComponent {
  @Input() isDeleteVisible: boolean = false;
  @Input() isVisible: boolean = false;
  @Input() title?: string;
  @Input() message?: string;
  @Input() itemName?: any;
  @Input() itemType?: string;
  @Output() confirm = new EventEmitter<void>();
  @Output() confirmForm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  isDeleteLoading = input(false);
  isFormLoading = input(false);
  @Input() isModalType: any;
  @Input() modalTitle: string = '';
  @Input() modalContent!: any;
  constructor(){}
  /**
   * Determines whether confirm on
   */
  onConfirm() {
    this.confirm.emit();
  }

  onFormConfirm(event: Event) {
    event.preventDefault();  // Prevent the form from submitting
    this.confirmForm.emit();
  }

  onCloseForm() {
    this.cancel.emit();
    this.isVisible = false;
  }


  /**
   * Determines whether cancel on
   */
  onCancel() {
    this.cancel.emit();
  }
}
