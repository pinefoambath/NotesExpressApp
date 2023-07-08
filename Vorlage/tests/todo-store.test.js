import chai from 'chai';
import { todoStore } from '../services/todo-store.js';

describe('TodoStore', () => {
  describe('.all()', () => {
    it('should return an array of all todos', async () => {
      const todos = await todoStore.all();

      chai.expect(todos).to.be.an('array');
    });
  });
});
