import { Subject, Subscriber, Subscription, SubscriptionLike } from 'rxjs';

const last = <T>( items: T[] ) => items.length > 0 ? items[items.length - 1] : undefined;

/**
 * A [stack](https://www.studytonight.com/data-structures/stack-data-structure) subject.
 * 
 * @see Subject https://rxjs-dev.firebaseapp.com/guide/subject
 * @noInheritDoc
 * @typeParam T - The type of item contained by the StackSubject.
 */
export class StackSubject<T> extends Subject<T> {
	private stack: T[] = [];

	public constructor( ...items: T[] ){
		super();

		if ( items && items.length > 0 ){
			this.stack = items;
			this.emitNewValue();
		}
	}

	public next( value?: T ){
		throw new Error( 'Forbidden call to `next`. Please use `push` or `pushEach`.' );
	}

	/**
	 * DO NOT USE. This is an internal implementation.
	 * 
	 * @param subscriber - The function to execute on new values.
	 */
	public _subscribe( subscriber: Subscriber<T> ): Subscription {
		const subscription = super._subscribe( subscriber );
		if ( subscription && !( subscription as SubscriptionLike ).closed ) {
			this.emitNewValue();
		}
		return subscription;
	  }

	/**
	 * Retrieves the current value of the stack.
	 */
	public get value() {
		return last( this.stack );
	}
	
	/**
	 * Emit the current value.
	 */
	private emitNewValue() {
		super.next( this.value );
	}

	/**
	 * Append items to the stack, and emit the last value.
	 * 
	 * @param items - Items to add at the end of the stack.
	 */
	public push( ...items: T[] ) {
		if ( items.length !== 0 ){
			this.stack.push( ...items );
			this.emitNewValue();
		}
		return this;
	}

	/**
	 * Append items to the stack, and emit each one of them
	 * 
	 * @param items - Items to add at the end of the stack.
	 */
	public pushEach( ...items: T[] ) {
		for ( let item of items ){
			this.push( item );
		}
		return this;
	}

	/**
	 * Pop items from the stack, and emit new current value.
	 * 
	 * @param count - The number of items to pop.
	 */
	public pop( count = 1 ){
		if ( count != 0 && this.stack.length !== 0 ){
			this.stack = this.stack.slice( 0, this.stack.length - count );
			this.emitNewValue();
		}
		return this;
	}

	/**
	 * Pop items from the stack, and emit each popped value.
	 * 
	 * @param count - The number of items to pop.
	 */
	public popEach( count = 1 ){
		for ( let i = 0; i < count; i++ ){
			this.pop();
		}
		return this;
	}
}
