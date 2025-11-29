  /**
   * prevent multiple spaces
   * @param event 
   * @param maxLength 
   * @returns 
   */
  export function preventMultipleSpaces(event: KeyboardEvent, maxLength?: number) {
  const input = event.target as HTMLInputElement;
  const cursorPosition = input.selectionStart;
  const key = event.key;

  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
  if (allowedKeys.includes(key)) return;

  const value = input.value;
  const selectionStart = input.selectionStart ?? 0;
  const selectionEnd = input.selectionEnd ?? 0;
  const selectedTextLength = selectionEnd - selectionStart;

  // Prevent leading space
  if (cursorPosition === 0 && key === ' ') {
    event.preventDefault();
    return;
  }

  // Prevent multiple consecutive spaces
  if (key === ' ' && value[cursorPosition! - 1] === ' ') {
    event.preventDefault();
    return;
  }

  // Allow numbers, letters, space, and one decimal point
  if (!/^[a-zA-Z0-9. ]$/.test(key)) {
    event.preventDefault();
    return;
  }

  // Allow only one decimal point
  if (key === '.' && value.includes('.')) {
    event.preventDefault();
    return;
  }

  // Limit to 3 digits after decimal
  const dotIndex = value.indexOf('.');
  if (dotIndex !== -1 && key.match(/[0-9]/)) {
    if (cursorPosition! > dotIndex) {
      const decimalPart = value.substring(dotIndex + 1, selectionStart) + key + value.substring(selectionEnd);
      if (decimalPart.length > 5) {
        event.preventDefault();
        return;
      }
    }
  }

  // Limit total length if maxLength is provided
  if (maxLength) {
    const newLength = value.length - selectedTextLength + 1;
    if (newLength > maxLength) {
      event.preventDefault();
      return;
    }
  }
  
}

 /**
   * Prevents special characters
   * @param event 
   */
  export function preventSpecialCharacters(event: KeyboardEvent) {

    const regex = /^[A-Za-z ]+$/; // Allows only alphabets and space
    const key = event.key;
    
    if (!regex.test(key)) {
      event.preventDefault(); // Block special characters and numbers
    }
}
