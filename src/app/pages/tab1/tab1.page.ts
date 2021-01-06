import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    constructor(private deseosService: DeseosService,
        private router: Router,
        public alertCtrl: AlertController) { }

    async addList() {

        const alert = await this.alertCtrl.create({
            header: 'Crear lista',
            inputs: [
                {
                    name: 'title',
                    type: 'text',
                    placeholder: 'Nombre de la lista'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel'
                },
                {
                    text: 'Crear',
                    handler: (data) => {
                        if (data.title.length === 0) {return}

                        const listId = this.deseosService.addList(data.title)
                        this.deseosService.saveStorage()

                        this.router.navigateByUrl(`tabs/tab1/add/${listId}`);
                    }
                }
            ]
        });
        alert.present();
    }


}
