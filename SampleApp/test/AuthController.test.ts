import {AuthController,userRepository}  from 'mhpauth';
// const AuthController = require("mhpauth");

  beforeAll(() => {
    console.log("apples");
  });

  describe('Test Registration', () => {
    let stack:any="";

  
    beforeEach(() => {
      stack = "ap";
    
    });
  
    // it('is created empty', () => {
    //     // const services = require('../src/services/index');
    //   expect(stack.top).toBe(-1);
    //   expect(stack.items).toEqual({});
    // });
  
    // it('can push to the top', () => {
    //   stack.push('🥑');
    //   expect(stack.top).toBe(0);
    //   expect(stack.peek).toBe('🥑');
  
    //   stack.push('🌽');
    //   expect(stack.top).toBe(1);
    //   expect(stack.peek).toBe('🌽');
    // });
  
    it.todo('can pop off');
  });