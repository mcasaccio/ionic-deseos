import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private deseosService: DeseosService) {}

}
