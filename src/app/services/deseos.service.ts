import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
    providedIn: 'root'
})
export class DeseosService {

    // creo el servicio lists vacio para luego cargar las listas
    lists: List[] = [];

    constructor() {
        this.loadStorage()
    }

    // agregar nueva lista y retornar el ID de la lista creada
    addList(title: string) {
        const newList = new List(title)
        this.lists.push(newList)
        this.saveStorage()

        // devuelvo el ID
        return newList.id;
    }

    getListId(id: string | number) {

        id = Number(id)

        // lee todas las listas[] y devuelve la que tiene el ID que se pasa por parametro
        return this.lists.find( listData => listData.id === id )


    }

    deleteList(list: List) {
        // pasa por parametro la lista a borrar para poder usar su ID en el filtro
        this.lists = this.lists.filter( listsData => listsData.id !== list.id)
        this.saveStorage()
    }

    // guardar en localstorage
    saveStorage() {
        localStorage.setItem('data', JSON.stringify(this.lists))
        // data es el nombre que se le puso al localstorage
        // el JSON.stringify convierte el arreglo que estoy guardando en strings
    }

    // cargar el localstorage
    loadStorage() {
        if (localStorage.getItem('data')) {
            this.lists = JSON.parse(localStorage.getItem('data'))
            // JSON.parse convierte el string en un arreglo
        }
    }


}
