import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { initFlowbite } from 'flowbite';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SideBarComponent,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'ai-task-manager-frontend';
  router = inject(Router);
  showHeader = signal(false);
  showSideBar = signal(false);

  private routerSubscription!: Subscription;

 constructor() {
  this.routerSubscription = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      
      const url = (event as NavigationEnd).urlAfterRedirects;

      // Only hide header/sidebar on Login + Signup
      const restrictedRoutes = ['/', '/sign-up'];

      const isRestricted = restrictedRoutes.includes(url);

      this.showHeader.set(!isRestricted);
      this.showSideBar.set(!isRestricted);
    });
}



  ngOnInit(): void {
    initFlowbite();
  }
  
  ngOnDestroy(){
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
