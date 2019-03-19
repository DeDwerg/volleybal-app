import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpelersComponent } from './spelers/spelers.component';
import { SetComponent } from './set/set.component';
import { ResultatenComponent } from './resultaten/resultaten.component';

@NgModule({
  declarations: [
    AppComponent,
    SpelersComponent,
    SetComponent,
    ResultatenComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
