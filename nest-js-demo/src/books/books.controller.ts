import { Controller, Get } from '@nestjs/common';

@Controller('books')
export class BooksController {
    @Get()
    async GetBooks(){
        const books = { ID: 1, title: 'Wings', description: 'APJ' };
        return books;
    }
}
