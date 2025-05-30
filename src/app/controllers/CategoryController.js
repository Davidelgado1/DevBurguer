import * as Yup from 'yup';
import Category from '../models/Category';
 
class CategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }

    const { name,} = request.body;

    const categoryExists = await Category.findOne({
      where: { name },
    });

    if (categoryExists) {
      return response.status(400).json({ error: 'Category already exists' });
    }

    const category = await Category.create({
      name,
    });

    return response.json(category);
  }

  async index(request, response) {
    const categories = await Category.findAll();

    return response.status(201).json(categories);
  }
}

export default new CategoryController();
