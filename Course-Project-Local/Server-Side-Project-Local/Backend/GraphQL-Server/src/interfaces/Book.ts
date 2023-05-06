interface Book {
  title: string;
  author: string;
  description: string;
  price: number;
  image: string;
}

interface BookTest {
  id?: string;
  title?: string;
  author?: string;
  description?: string;
  price?: number;
  image?: string;
}

export {Book, BookTest};
