import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { BookInfoComponent } from './components/book-info/book-info.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { AuthorInfoComponent } from './components/author-info/author-info.component';
import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { BookCategoriesComponent } from './components/book-categories/book-categories.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { RoleGuard } from './_helpers/role.guard';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'categories', component: BookCategoriesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user/info', component: UserInfoComponent},
  {path: 'books/:id', component: BookInfoComponent},
  {path: 'books/page/:pageNo', component: BooksListComponent},
  {path: 'books/page/:pageNo/:categoryId', component: BooksListComponent},
  {path: 'authors/:id', component: AuthorInfoComponent},
  {path: 'authors/page/:pageNo', component: AuthorsListComponent},
  {path: 'books', redirectTo: 'books/page/1', pathMatch: 'full'},
  {path: 'authors', redirectTo: 'authors/page/1', pathMatch: 'full'},
  {path: 'admin', component: AdminPanelComponent, canActivate: [RoleGuard], data: { role: 'admin' }},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
