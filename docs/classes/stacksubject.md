[stack-subject](../README.md) > [StackSubject](../classes/stacksubject.md)

# Class: StackSubject

A [stack](https://www.studytonight.com/data-structures/stack-data-structure) subject.

*__see__*: Subject [https://rxjs-dev.firebaseapp.com/guide/subject](https://rxjs-dev.firebaseapp.com/guide/subject)

## Type parameters
#### T 

The type of item contained by the StackSubject.

## Hierarchy

 `Subject`<`T`>

**↳ StackSubject**

## Implements

* `Subscribable`<`T`>
* `SubscriptionLike`

## Index

### Constructors

* [constructor](stacksubject.md#constructor)

### Accessors

* [length](stacksubject.md#length)
* [value](stacksubject.md#value)

### Methods

* [_subscribe](stacksubject.md#_subscribe)
* [next](stacksubject.md#next)
* [pop](stacksubject.md#pop)
* [popEach](stacksubject.md#popeach)
* [push](stacksubject.md#push)
* [pushEach](stacksubject.md#pusheach)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new StackSubject**(...items: *`T`[]*): [StackSubject](stacksubject.md)

*Overrides Subject.__constructor*

*Defined in [StackSubject.ts:20](https://github.com/GerkinDev/stack-subject/blob/83d8bf5/src/StackSubject.ts#L20)*

Create a new observable, and eventually initialize it with some items.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Rest` items | `T`[] |  The initial stack contained by the new StackSubject. |

**Returns:** [StackSubject](stacksubject.md)

___

## Accessors

<a id="length"></a>

###  length

getlength(): `number`

*Defined in [StackSubject.ts:18](https://github.com/GerkinDev/stack-subject/blob/83d8bf5/src/StackSubject.ts#L18)*

Get the current number of items stacked in the observable.

**Returns:** `number`

___
<a id="value"></a>

###  value

getvalue(): `undefined` \| `T`

*Defined in [StackSubject.ts:62](https://github.com/GerkinDev/stack-subject/blob/83d8bf5/src/StackSubject.ts#L62)*

Retrieves the current value of the stack.

**Returns:** `undefined` \| `T`

___

## Methods

<a id="_subscribe"></a>

###  _subscribe

▸ **_subscribe**(subscriber: *`Subscriber`<`T`>*): `Subscription`

*Overrides Subject._subscribe*

*Defined in [StackSubject.ts:51](https://github.com/GerkinDev/stack-subject/blob/83d8bf5/src/StackSubject.ts#L51)*

DO NOT USE. This is an internal implementation.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| subscriber | `Subscriber`<`T`> |  The function to execute on new values. |

**Returns:** `Subscription`

___
<a id="next"></a>

###  next

▸ **next**(value?: *[T]()*): `void`

*Overrides Subject.next*

*Defined in [StackSubject.ts:42](https://github.com/GerkinDev/stack-subject/blob/83d8bf5/src/StackSubject.ts#L42)*

DP NOT USE. This method will throw an error to force you to use the [push](#push) or [pushEach](#pushEach) methods.

*__deprecated__*:
 You should not use this class, in favor of [push](#push) or [pushEach](#pushEach)

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` value | [T]() |  Just don't do it. |

**Returns:** `void`

___
<a id="pop"></a>

###  pop

▸ **pop**(count?: *`number`*): `this`

*Defined in [StackSubject.ts:103](https://github.com/GerkinDev/stack-subject/blob/83d8bf5/src/StackSubject.ts#L103)*

Pop items from the stack, and emit new current value.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` count | `number` | 1 |  The number of items to pop. |

**Returns:** `this`

___
<a id="popeach"></a>

###  popEach

▸ **popEach**(count?: *`number`*): `this`

*Defined in [StackSubject.ts:116](https://github.com/GerkinDev/stack-subject/blob/83d8bf5/src/StackSubject.ts#L116)*

Pop items from the stack, and emit each popped value.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` count | `number` | 1 |  The number of items to pop. |

**Returns:** `this`

___
<a id="push"></a>

###  push

▸ **push**(...items: *`T`[]*): `this`

*Defined in [StackSubject.ts:78](https://github.com/GerkinDev/stack-subject/blob/83d8bf5/src/StackSubject.ts#L78)*

Append items to the stack, and emit the last value.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Rest` items | `T`[] |  Items to add at the end of the stack. |

**Returns:** `this`

___
<a id="pusheach"></a>

###  pushEach

▸ **pushEach**(...items: *`T`[]*): `this`

*Defined in [StackSubject.ts:91](https://github.com/GerkinDev/stack-subject/blob/83d8bf5/src/StackSubject.ts#L91)*

Append items to the stack, and emit each one of them

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Rest` items | `T`[] |  Items to add at the end of the stack. |

**Returns:** `this`

___

