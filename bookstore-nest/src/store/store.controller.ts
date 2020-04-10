import { Controller, Get, Param, Post, Body, Delete, Query, Put } from '@nestjs/common';
import { STOREDTO } from './dto/store-dto';
import { StoreService } from './store.service';


@Controller('store')
export class StoreController {
 
    /**
     *
     */
    constructor(private storeService :StoreService) {
       
    }

    @Get()
    async GetStores(){
        const stores= await this.storeService.GetStoreDetails();
        return stores;
    }

    @Get(':storeID')
    async GetBook(@Param('storeID') storeId){

        const stores = await this.storeService.GetStoreDetailById(storeId);
        return stores;
    }

    @Post()
    async addBook(@Body() InsertDetails: STOREDTO) {
        const stores = await this.storeService.AddStore(InsertDetails);
        return stores;
    }

    @Delete()
    async DeleteBook( @Query() query)
    {
        const stores = await this.storeService.DeleteStore(query.ID);
        return stores;
    }

    @Put()
    async updateBook(@Body() updateDetails:STOREDTO ) {
        
        const stores = await this.storeService.UpdateStore(updateDetails);
        return stores;
    }

}
