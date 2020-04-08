import { Controller, Get, Param, Body, Post, Query, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/Create-book.dto';
import { get } from 'http';
import { query } from 'express';

@Controller('books')
export class BooksController {
    /**
     *
     */
    constructor(private booksService : BooksService) {
       
        
    }

    @Get()
    async GetBooks(){
        const books= await this.booksService.getBooks();
        return books;
    }

    @Get(':bookID')
    async GetBook(@Param('bookID') bookID){

        const book = await this.booksService.getBook(bookID);
        return book;
    }

    @Post()
    async addBook(@Body() cto: CreateBookDTO) {
        const book = await this.booksService.addBook(cto);
        return book;
    }

    @Delete()
    async DeleteBook( @Query() query)
    {
        const book = await this.booksService.deleteBook(query.ID);
        return book;
    }


}
