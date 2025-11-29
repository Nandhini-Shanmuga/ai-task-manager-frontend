import { Component,input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BreadcrumbItem } from '../../interfaces/breadcrumb.interface';

@Component({
  selector: 'app-breacrumb',
  standalone: true,
  imports: [],
  templateUrl: './breacrumb.component.html',
  styleUrl: './breacrumb.component.css'
})
export class BreacrumbComponent {
 items = input.required<BreadcrumbItem[]>();

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  /**
   * Trusts html
   * @param html 
   * @returns  
   */
  protected trustHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  /**
   * Navigates to
   * @param {string} url
   */
  protected navigateTo(url: string |null) {
    if(url){
      void this.router.navigateByUrl(url);
    }
  }
}
