import { ObjectUnsubscribedError } from 'rxjs';
import { StackSubject } from '../src/index';

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
