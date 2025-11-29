  import { HttpClient } from '@angular/common/http';
  import { inject, Injectable } from '@angular/core';
  import { environment } from '../../../environments/environment';

  @Injectable({
    providedIn: 'root'
  })
  export class  AuthService {
    private http = inject(HttpClient)
   
    constructor() { }
    /**
   * Login user
   */
  loginUser(data: any) {
    return this.http.post(`${environment.API_BASE_URL}auth/login`, data);
  }

  /**
   * Signup user
   */
  signupUser(data: any) {
    return this.http.post(`${environment.API_BASE_URL}auth/signup`, data);
  }

  /**
   * Get Current logged-in user
   */
  getCurrentUser() {
    return this.http.get(`${environment.API_BASE_URL}auth/getCurrentUser`);
  }

  /**
   * Logout user
   */
  logoutUser() {
    return this.http.post(`${environment.API_BASE_URL}auth/logout`, {});
  }
  /**
   * Checks email if user is already exist
   * @param email 
   * @returns  
   */
  checkEmail(email: string) {
  return this.http.get(`${environment.API_BASE_URL}auth/check-email?email=${email}`);
}


getTaskStats(start: string, end: string) {
  return this.http.get(`${environment.API_BASE_URL}analytics/stats?startDate=${start}&endDate=${end}`) 

  }

  getDashboardSummary() {
  return this.http.get(`${environment.API_BASE_URL}analytics/dashboard`);
}
  }