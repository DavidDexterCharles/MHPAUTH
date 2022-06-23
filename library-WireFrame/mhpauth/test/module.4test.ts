//  const jauthService = require('../src/services/index');
import {Person}  from '../src/services/index'

class Stack {
    private top: number;
    private items: any;
    constructor() {
      this.top = -1;
      this.items = {};
    }
  
    get peek() {
      return this.items[this.top];
    }
  
    push(value:any) {
      this.top += 1;
      this.items[this.top] = value;
    }
  }
  
  describe('My Stack', () => {
    let stack:any;

  
    beforeEach(() => {
      stack = new Stack();
    //   const services = require('../src/index');
   
    //  var p = new Person("david t","c");
    // console.log(p.getFullName());
    });
  
    it('is created empty', () => {
        // const services = require('../src/services/index');
      expect(stack.top).toBe(-1);
      expect(stack.items).toEqual({});
    });
  
    it('can push to the top', () => {
      stack.push('🥑');
      expect(stack.top).toBe(0);
      expect(stack.peek).toBe('🥑');
  
      stack.push('🌽');
      expect(stack.top).toBe(1);
      expect(stack.peek).toBe('🌽');
    });
  
    it.todo('can pop off');
  });

  // https://medium.com/nerd-for-tech/testing-typescript-with-jest-290eaee9479d