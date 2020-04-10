import { Injectable, HttpException } from '@nestjs/common';
import { BOOKS } from '../Mock/books.mock';
import { resolve } from 'dns';
import { CreateBookDTO } from './dto/Create-book.dto';


@Injectable()
export class BooksService {
books= BOOKS;

getBooks():Promise<any>{
    return new Promise( resolve=>{resolve(this.books);})
}

getBook(BookID):Promise<any>{

    let Id=Number(BookID);
    return new Promise(

        resolve=>{
            const bk=this.books.find(b=>b.ID==BookID);

            if(!bk){
                throw new HttpException('Book Not Exists',404);
            }
            resolve(bk);
        }
    );

}


addBook(bs: CreateBookDTO): Promise<any> {
    return new Promise(resolve => {

        if (!bs.ID) {
            throw new HttpException('Book Details Required',404);
        }
        else{
            // const bookn = { ID: bs.ID, title: 'Wings', description: 'APJ' };
            this.books.push(bs);
            resolve(this.books);
        }
       
    });
}

deleteBook(bookId) : Promise<any>{
    return new Promise(
        resolve=>{

            let Id = Number(bookId);
            let Index = this.books.findIndex(bk=> bk.ID==Id);

            if(Index <0){
                throw new HttpException('Book Not Found', 404);
            }

            this.books.splice(Index,1);
            resolve(this.books);

        }
    )
}

updateBook(book :CreateBookDTO) : Promise<any>{
    return new Promise(
        resolve=>{

            let Index = this.books.findIndex(bk=> bk.ID==book.ID);
            if(Index <0){
                throw new HttpException('Book Not Found', 404);
            }

            const bk=this.books.find(b=>b.ID==book.ID);
            bk.title= book.title;
            bk.description=book.description;

            this.books.splice(Index,1);
            this.books.push(bk);

            resolve(this.books);

        }
    )
}



}
