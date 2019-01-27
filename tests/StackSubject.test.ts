import { ObjectUnsubscribedError } from 'rxjs';
import { StackSubject } from '../src/index';
import { orderedMockCalls } from './utils';

describe( 'Inherited & base class methods', () => {
	describe( 'Constructor', () => {
		it( '`undefined` first subscribe call', () => {
			const observable = new StackSubject<number>();
			const mockFn = jest.fn();
			const subscription = observable.subscribe( mockFn );
			expect( mockFn ).toHaveBeenCalledTimes( 1 );
			expect( mockFn ).toHaveBeenCalledWith( undefined );
			subscription.unsubscribe();
		} );
		it( 'Initialized first subscribe call', () => {
			const observable = new StackSubject<number>( 1 );
			const mockFn = jest.fn();
			const subscription = observable.subscribe( mockFn );
			expect( mockFn ).toHaveBeenCalledTimes( 1 );
			expect( mockFn ).toHaveBeenCalledWith( 1 );
			subscription.unsubscribe();
		} );
		it( 'Initialized first subscribe call with multiple init parameters', () => {
			const observable = new StackSubject<number>( 1, 2 );
			const mockFn = jest.fn();
			const subscription = observable.subscribe( mockFn );
			expect( mockFn ).toHaveBeenCalledTimes( 1 );
			expect( mockFn ).toHaveBeenCalledWith( 2 );
			subscription.unsubscribe();
		} );
	} );
	it( 'value', () => {
		const observable = new StackSubject<number>();
		expect( observable.value ).toEqual( undefined );

		observable.push( 1 );
		expect( observable.value ).toEqual( 1 );
		observable.push( 2, 3 );
		expect( observable.value ).toEqual( 3 );
		observable.pushEach( 4,5 );
		expect( observable.value ).toEqual( 5 );

		observable.pop();
		expect( observable.value ).toEqual( 4 );
		observable.pop( 2 );
		expect( observable.value ).toEqual( 2 );
		observable.popEach( 2 );
		expect( observable.value ).toEqual( undefined );
	} );
} );
describe( 'Push methods', () => {
	describe( '`push`', () => {
		it( 'Simple push triggers once.', () => {
			const observable = new StackSubject<number>();
			const mockFn = orderedMockCalls();
			const subscription = observable.subscribe( mockFn );
			observable.push( 1 );
			expect( mockFn ).toHaveBeenCalledTimes( 2 );
			expect( mockFn.argsCall[0] ).toEqual( [undefined] );
			expect( mockFn.argsCall[1] ).toEqual( [1] );
			subscription.unsubscribe();
		} );
		it( 'Multiple pushes triggers multiple times.', () => {
			const observable = new StackSubject<number>();
			const mockFn = orderedMockCalls();
			const subscription = observable.subscribe( mockFn );
			observable.push( 1 );
			observable.push( 2 );
			expect( mockFn ).toHaveBeenCalledTimes( 3 );
			expect( mockFn.argsCall[0] ).toEqual( [undefined] );
			expect( mockFn.argsCall[1] ).toEqual( [1] );
			expect( mockFn.argsCall[2] ).toEqual( [2] );
			subscription.unsubscribe();
		} );
		it( 'Multi-push triggers multiple once.', () => {
			const observable = new StackSubject<number>();
			const mockFn = orderedMockCalls();
			const subscription = observable.subscribe( mockFn );
			observable.push( 1, 2 );
			expect( mockFn ).toHaveBeenCalledTimes( 2 );
			expect( mockFn.argsCall[0] ).toEqual( [undefined] );
			expect( mockFn.argsCall[1] ).toEqual( [2] );
			subscription.unsubscribe();
		} );
		it( 'Empty push should not trigger', () => {
			const observable = new StackSubject<number>();
			const mockFn = orderedMockCalls();
			const subscription = observable.subscribe( mockFn );
			observable.push();
			expect( mockFn ).toHaveBeenCalledTimes( 1 );
			expect( mockFn.argsCall[0] ).toEqual( [undefined] );
			subscription.unsubscribe();
		} );
	} );
	describe( '`pushEach`', () => {
		it( 'Simple push triggers once.', () => {
			const observable = new StackSubject<number>();
			const mockFn = orderedMockCalls();
			const subscription = observable.subscribe( mockFn );
			observable.pushEach( 1 );
			expect( mockFn ).toHaveBeenCalledTimes( 2 );
			expect( mockFn.argsCall[0] ).toEqual( [undefined] );
			expect( mockFn.argsCall[1] ).toEqual( [1] );
			subscription.unsubscribe();
		} );
		it( 'Multiple pushes triggers multiple times.', () => {
			const observable = new StackSubject<number>();
			const mockFn = orderedMockCalls();
			const subscription = observable.subscribe( mockFn );
			observable.pushEach( 1 );
			observable.pushEach( 2 );
			expect( mockFn ).toHaveBeenCalledTimes( 3 );
			expect( mockFn.argsCall[0] ).toEqual( [undefined] );
			expect( mockFn.argsCall[1] ).toEqual( [1] );
			expect( mockFn.argsCall[2] ).toEqual( [2] );
			subscription.unsubscribe();
		} );
		it( 'Multi-push triggers each once.', () => {
			const observable = new StackSubject<number>();
			const mockFn = orderedMockCalls();
			const subscription = observable.subscribe( mockFn );
			observable.pushEach( 1, 2 );
			expect( mockFn ).toHaveBeenCalledTimes( 3 );
			expect( mockFn.argsCall[0] ).toEqual( [undefined] );
			expect( mockFn.argsCall[1] ).toEqual( [1] );
			expect( mockFn.argsCall[2] ).toEqual( [2] );
			subscription.unsubscribe();
		} );
		it( 'Empty push should not trigger', () => {
			const observable = new StackSubject<number>();
			const mockFn = orderedMockCalls();
			const subscription = observable.subscribe( mockFn );
			observable.pushEach();
			expect( mockFn ).toHaveBeenCalledTimes( 1 );
			expect( mockFn.argsCall[0] ).toEqual( [undefined] );
			subscription.unsubscribe();
		} );
	} );
} );
describe( 'Pop methods', () => {
	describe( '`pop`', () => {
		it( 'Pop on empty stack', () => {
			const observable = new StackSubject<number>();
			const mockFn = orderedMockCalls();
			const subscription = observable.subscribe( mockFn );
			observable.pop();
			expect( mockFn ).toHaveBeenCalledTimes( 1 );
			expect( mockFn.argsCall[0] ).toEqual( [undefined] );
			subscription.unsubscribe();
		} );
		it( 'Pop 1 to 0', () => {
			const observable = new StackSubject<number>( 1 );
			const mockFn = orderedMockCalls();
			const subscription = observable.subscribe( mockFn );
			observable.pop();
			expect( mockFn ).toHaveBeenCalledTimes( 2 );
			expect( mockFn.argsCall[0] ).toEqual( [1] );
			expect( mockFn.argsCall[1] ).toEqual( [undefined] );
			subscription.unsubscribe();
		} );
		it( 'Pop 2 to 1', () => {
			const observable = new StackSubject<number>( 1, 2 );
			const mockFn = orderedMockCalls();
			const subscription = observable.subscribe( mockFn );
			observable.pop();
			expect( mockFn ).toHaveBeenCalledTimes( 2 );
			expect( mockFn.argsCall[0] ).toEqual( [2] );
			expect( mockFn.argsCall[1] ).toEqual( [1] );
			subscription.unsubscribe();
		} );
		it( 'Pop 2 to 0', () => {
			const observable = new StackSubject<number>( 1, 2 );
			const mockFn = orderedMockCalls();
			const subscription = observable.subscribe( mockFn );
			observable.pop( 2 );
			expect( mockFn ).toHaveBeenCalledTimes( 2 );
			expect( mockFn.argsCall[0] ).toEqual( [2] );
			expect( mockFn.argsCall[1] ).toEqual( [undefined] );
			subscription.unsubscribe();
		} );
		it( 'Pop 3 to 1', () => {
			const observable = new StackSubject<number>( 1, 2, 3 );
			const mockFn = orderedMockCalls();
			const subscription = observable.subscribe( mockFn );
			observable.pop( 2 );
			expect( mockFn ).toHaveBeenCalledTimes( 2 );
			expect( mockFn.argsCall[0] ).toEqual( [3] );
			expect( mockFn.argsCall[1] ).toEqual( [1] );
			subscription.unsubscribe();
		} );
	} );
	describe( '`popEach`', () => {
		it( 'Pop on empty stack', () => {
			const observable = new StackSubject<number>();
			const mockFn = orderedMockCalls();
			const subscription = observable.subscribe( mockFn );
			observable.popEach();
			expect( mockFn ).toHaveBeenCalledTimes( 1 );
			expect( mockFn.argsCall[0] ).toEqual( [undefined] );
			subscription.unsubscribe();
		} );
		it( 'Pop 1 to 0', () => {
			const observable = new StackSubject<number>( 1 );
			const mockFn = orderedMockCalls();
			const subscription = observable.subscribe( mockFn );
			observable.popEach();
			expect( mockFn ).toHaveBeenCalledTimes( 2 );
			expect( mockFn.argsCall[0] ).toEqual( [1] );
			expect( mockFn.argsCall[1] ).toEqual( [undefined] );
			subscription.unsubscribe();
		} );
		it( 'Pop 2 to 1', () => {
			const observable = new StackSubject<number>( 1, 2 );
			const mockFn = orderedMockCalls();
			const subscription = observable.subscribe( mockFn );
			observable.popEach();
			expect( mockFn ).toHaveBeenCalledTimes( 2 );
			expect( mockFn.argsCall[0] ).toEqual( [2] );
			expect( mockFn.argsCall[1] ).toEqual( [1] );
			subscription.unsubscribe();
		} );
		it( 'Pop 2 to 0', () => {
			const observable = new StackSubject<number>( 1, 2 );
			const mockFn = orderedMockCalls();
			const subscription = observable.subscribe( mockFn );
			observable.popEach( 2 );
			expect( mockFn ).toHaveBeenCalledTimes( 3 );
			expect( mockFn.argsCall[0] ).toEqual( [2] );
			expect( mockFn.argsCall[1] ).toEqual( [1] );
			expect( mockFn.argsCall[2] ).toEqual( [undefined] );
			subscription.unsubscribe();
		} );
		it( 'Pop 3 to 1', () => {
			const observable = new StackSubject<number>( 1, 2, 3 );
			const mockFn = orderedMockCalls();
			const subscription = observable.subscribe( mockFn );
			observable.popEach( 2 );
			expect( mockFn ).toHaveBeenCalledTimes( 3 );
			expect( mockFn.argsCall[0] ).toEqual( [3] );
			expect( mockFn.argsCall[1] ).toEqual( [2] );
			expect( mockFn.argsCall[2] ).toEqual( [1] );
			subscription.unsubscribe();
		} );
	} );
} );
