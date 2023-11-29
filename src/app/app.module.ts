import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import modułu FormsModule
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { HomeComponent } from './components/home/home.component'; // Dodaj import komponentu

@NgModule({
  declarations: [
    AppComponent,
    AddPostComponent,
    HomeComponent, // Dodaj komponent do deklaracji
  ],
  imports: [
    BrowserModule,
    FormsModule, // Dodaj FormsModule do modułów
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
