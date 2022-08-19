import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_DATA = [
  {
    id: 'p1',
    price: 6,
    title: 'My First Book',
    description: 'first book that I wrote'
  },
  {
    id: 'p2',
    price: 5,
    title: 'My second Book',
    description: 'second book that I wrote'
  }
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_DATA.map(product => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          );
        })}
        {/* <ProductItem
          title='Test'
          price={6}
          description='This is a first product - amazing!'
        /> */}
      </ul>
    </section>
  );
};

export default Products;
