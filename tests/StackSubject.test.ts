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
} );
describe( 'Push methods', () => {
	it( 'No push should trigger subscriptions with `undefined`.', () => {
		const observable = new StackSubject<number>();
		const mockFn = jest.fn();
		const subscription = observable.subscribe( mockFn );
		observable.push( 1 );
		expect( mockFn ).toHaveBeenCalledTimes( 2 );
		expect( mockFn ).toHaveBeenCalledWith( undefined );
		expect( mockFn ).toHaveBeenCalledWith( 1 );
		subscription.unsubscribe();
	} );
	it( 'Simple push should trigger subscriptions after init  once.', () => {
		const observable = new StackSubject<number>();
		const mockFn = jest.fn();
		const subscription = observable.subscribe( mockFn );
		observable.push( 1 );
		expect( mockFn ).toHaveBeenCalledTimes( 2 );
		expect( mockFn ).toHaveBeenCalledWith( undefined );
		expect( mockFn ).toHaveBeenCalledWith( 1 );
		subscription.unsubscribe();
	} );
	it( 'Multiple subsequent pushes should trigger subscriptions after init  multiple times.', () => {
		const observable = new StackSubject<number>();
		const mockFn = jest.fn();
		const subscription = observable.subscribe( mockFn );
		observable.push( 1 );
		observable.push( 2 );
		expect( mockFn ).toHaveBeenCalledTimes( 3 );
		expect( mockFn ).toHaveBeenCalledWith( undefined );
		expect( mockFn ).toHaveBeenCalledWith( 1 );
		expect( mockFn ).toHaveBeenCalledWith( 2 );
		subscription.unsubscribe();
	} );
	it( 'Should throw if closed', () => {
		const observable = new StackSubject<number>();
		observable.closed = true;
		expect( () => observable.subscribe( jest.fn() ) ).toThrowError( ObjectUnsubscribedError );
	} );
} );
describe( 'Pop methods', () => {
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
