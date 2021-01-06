import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListItem } from 'src/app/models/list-item.model';
import { List } from 'src/app/models/list.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
    selector: 'app-add',
    templateUrl: './add.page.html',
    styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

    insertItem: List;
    itemName: string;

    constructor(private deseosService: DeseosService,
        private router: ActivatedRoute) {

        // captura el parametro de la url :ID que figura en tab1-routing.module.ts
        const listId = this.router.snapshot.paramMap.get('id')
        console.log('Lista cargada con ID ', listId)

        this.insertItem = this.deseosService.getListId(listId)

        console.log('Detalles de la lista: ', this.insertItem)
    }

    addItemToList() {
        if (this.itemName.length === 0) {
            return
        }
        const newItem = new ListItem(this.itemName)
        this.insertItem.items.push(newItem)

        // purgo el itemName que proviene del add.page.html para poder guardar otro nuevo
        this.itemName = '';
        this.deseosService.saveStorage()
    }

    changeCheckStatus(){
        // filtrar y contar cuantos pendientes existen en esta lista
        const pending = this.insertItem.items.filter( itemData => !itemData.completed).length;

        if ( pending === 0) {
            this.insertItem.completedAt = new Date()
            this.insertItem.completed = true
        } else {
            this.insertItem.completedAt = null;
            this.insertItem.completed = false
        }


        // guarda todos los ultimos cambios realizados
        this.deseosService.saveStorage()

        console.log(this.deseosService.lists)
    }

    delete(i: number){
        // splice elimina desde la posicion i hasta cuantos quiero borrar despues
        // de esa posición
        this.insertItem.items.splice(i,1)
        this.deseosService.saveStorage()
    }

    ngOnInit() {
    }

}
