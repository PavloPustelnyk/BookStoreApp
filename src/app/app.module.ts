import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { BookInfoComponent } from './components/book-info/book-info.component';
import { BookListItemComponent } from './components/book-list-item/book-list-item.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthorInfoComponent } from './components/author-info/author-info.component';
import { AuthorListItemComponent } from './components/author-list-item/author-list-item.component';
import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { BookCategoriesComponent } from './components/book-categories/book-categories.component';

@NgModule({
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule
   ],
   declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserInfoComponent,
    BookInfoComponent,
    BookListItemComponent,
    BooksListComponent,
    NotFoundComponent,
    AuthorInfoComponent,
    AuthorListItemComponent,
    AuthorsListComponent,
    NavBarComponent,
    HomeComponent,
    BookCategoriesComponent
   ],
   providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
