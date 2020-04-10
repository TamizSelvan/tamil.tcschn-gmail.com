import { Injectable, HttpException, Query } from '@nestjs/common';
import { STORES } from '../Mock/store.mock';
import { resolve } from 'dns';
import { STOREDTO } from './dto/store-dto';
import { query } from 'express';

@Injectable()
export class StoreService {

    stores=STORES;

    GetStoreDetails():Promise<any>{
        return new Promise(resolve=> resolve(this.stores));
    }

    GetStoreDetailById(StoreId):Promise<any>{
        return new Promise(resolve =>{

            let Id = Number(StoreId);
            const FindStore = this.stores.find(s=>s.id==Id);
            if(!FindStore)
            {
                throw new HttpException('Store Does not Exists',404);
            }
            resolve(FindStore);

        })
    }

    AddStore(sr:STOREDTO):Promise<any>{
        return new Promise(resolve=>{

          if(!sr.id){
              throw new HttpException('Required store details',404)

          }
           this.stores.push(sr);
            resolve(this.stores);
        })
    }

    UpdateStore(sr:STOREDTO):Promise<any>{
        return new Promise(resolve=>{

          if(!sr.id){
              throw new HttpException('Required store details',404)

          }
          let Id = Number(sr.id);
          let Index = this.stores.findIndex(s=> s.id==Id);
          if(Index <0){
            throw new HttpException('Store Not Found', 404);
        }

        this.stores.splice(Index,1);
        resolve(this.stores);

           this.stores.push(sr);
            resolve(this.stores);
        })
    }

    DeleteStore(storeid:number) :Promise<any>{
        return new Promise( resolve=>{

            let Id = Number(storeid);
            let Index = this.stores.findIndex(s=> s.id==Id);

            if(Index <0){
                throw new HttpException('Store Not Found', 404);
            }

            this.stores.splice(Index,1);
            resolve(this.stores);
        } )

    }

}
