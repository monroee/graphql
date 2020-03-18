import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SongsListComponent } from './components/songs-list/songs-list.component';
import { AddSongComponent } from './components/add-song/add-song.component';
import { AddArtistComponent } from './components/add-artist/add-artist.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'songs-list' },
  { path: 'songs-list', component: SongsListComponent },
  { path: 'add-song', component: AddSongComponent },
  { path: 'add-artist', component: AddArtistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
