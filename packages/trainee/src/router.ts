import module1 from './modules/module1';
import module2 from './modules/module2';
import module3 from './modules/module3';
import module4 from './modules/module4';
import selection from './selection';

const router = {
  '/': selection,
  '/module1': module1,
  '/module2': module2,
  '/module3': module3,
  '/module4': module4,
};

export default router;
