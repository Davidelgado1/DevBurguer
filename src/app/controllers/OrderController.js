import * as Yup from 'yup';
import Order from '../schemas/Order'; // <- Mongoose
import Product from '../models/product'; // <- Sequelize
import Category from '../models/category'; // <- Sequelize

class OrderController {
  async store(request, response) {
    const schema = Yup.object({
      products: Yup.array().required().of(
        Yup.object().shape({
          id: Yup.number().required(),
          quantity: Yup.number().required(),
        })
      ),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }

    const { products } = request.body;

    const productsIds = products.map((product) => product.id);

    const findProducts = await Product.findAll({
      where: {
        id: productsIds,
      },
      include: {
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
    });

    const formetedProducts = findProducts.map((product) => {
      const productIndex = products.findIndex(item => item.id === product.id);

      return {
        id: product.id,
        name: product.name,
        category: product.category.name,
        price: product.price,
        url: product.url,
        quantity: products[productIndex].quantity,
      };
    });

    // Agora salva no MongoDB via Mongoose
    const order = await Order.create({
      user: {
        id: request.userId,
        name: request.userName,
      },
      products: formetedProducts,
    });

    return response.status(201).json(order);
  }
}

export default new OrderController();