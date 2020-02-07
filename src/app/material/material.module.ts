import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		BrowserAnimationsModule,
		FlexLayoutModule,
		MatListModule,
		MatCardModule,
		MatIconModule
	],
	exports: [
		BrowserAnimationsModule,
		FlexLayoutModule,
		MatListModule,
		MatCardModule,
		MatIconModule
	]
})
export class MaterialModule {}
