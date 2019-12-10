import module1 from './module1';
import module2 from './module2';
import module3 from './module3';
import module4 from './module4';
import selection from './selection';

const router = {
  '/selection': selection,
  '/module1': module1, // /:id
  '/module2': module2,
  '/module3': module3,
  '/module4': module4,
};

export default router;
