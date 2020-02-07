import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecipeModule } from './recipe/recipe.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, RecipeModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
