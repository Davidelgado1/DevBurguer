import * as Yup from 'yup';
import Product from '../models/product';
import Category from '../models/category';

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      description: Yup.string(),
    });

    try {
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }

    const { filename: path } = request.file;
    const { name, price, category_id, description} = request.body;

    const product = await Product.create({
      name,
      price,
      category_id,
      path,
      description 
    });

    return response.json(product);
  }

  async index(request, response) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ]
    });

    return response.json(products);
  }
}

export default new ProductController();