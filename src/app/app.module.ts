import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecipeModule } from './recipe/recipe.module';
import { MaterialModule } from './material/material.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, RecipeModule, MaterialModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
