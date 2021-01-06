import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { List } from 'src/app/models/list.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

    @Input() completedPage = true;

    // viewchild selecciona el componente del html
    // si tiene un ID #lista
    // @ViewChild('lista')
    // en este caso selecciona el unico componente <ion-list> que el nombre
    // del componente es IonList
    @ViewChild(IonList) closeList: IonList;

    constructor(public deseosService: DeseosService,
        private router: Router,
        private alertCtrl: AlertController) { }



    selectedList(list: List) {

        if (this.completedPage) {
            this.router.navigateByUrl(`tabs/tab2/add/${list.id}`);
        } else {
            this.router.navigateByUrl(`tabs/tab1/add/${list.id}`);
        }

    }

    deleteList(list: List) {
        this.deseosService.deleteList(list)
    }

    async editList(list: List) {

        const alert = await this.alertCtrl.create({
            header: 'Editar nombre',
            inputs: [
                {
                    name: 'title',
                    type: 'text',
                    value: list.title,
                    placeholder: 'Nombre de la lista'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel'
                },
                {
                    text: 'Actualizar',
                    handler: (data) => {
                        if (data.title.length === 0) {return}

                        list.title = data.title
                        this.deseosService.saveStorage()
                        this.closeList.closeSlidingItems()
                    }
                }
            ]
        });
        alert.present();

    }

    ngOnInit() { }

}
