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

### Properties

* [stack](stacksubject.md#stack)

### Accessors

* [value](stacksubject.md#value)

### Methods

* [_subscribe](stacksubject.md#_subscribe)
* [emitNewValue](stacksubject.md#emitnewvalue)
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

*Defined in [StackSubject.ts:13](https://github.com/GerkinDev/stack-subject/blob/cc65284/src/StackSubject.ts#L13)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` items | `T`[] |

**Returns:** [StackSubject](stacksubject.md)

___

## Properties

<a id="stack"></a>

### `<Private>` stack

**● stack**: *`T`[]* =  []

*Defined in [StackSubject.ts:13](https://github.com/GerkinDev/stack-subject/blob/cc65284/src/StackSubject.ts#L13)*

___

## Accessors

<a id="value"></a>

###  value

getvalue(): `undefined` \| `T`

*Defined in [StackSubject.ts:44](https://github.com/GerkinDev/stack-subject/blob/cc65284/src/StackSubject.ts#L44)*

Retrieves the current value of the stack.

**Returns:** `undefined` \| `T`

___

## Methods

<a id="_subscribe"></a>

###  _subscribe

▸ **_subscribe**(subscriber: *`Subscriber`<`T`>*): `Subscription`

*Overrides Subject._subscribe*

*Defined in [StackSubject.ts:33](https://github.com/GerkinDev/stack-subject/blob/cc65284/src/StackSubject.ts#L33)*

DO NOT USE. This is an internal implementation.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| subscriber | `Subscriber`<`T`> |  The function to execute on new values. |

**Returns:** `Subscription`

___
<a id="emitnewvalue"></a>

### `<Private>` emitNewValue

▸ **emitNewValue**(): `void`

*Defined in [StackSubject.ts:51](https://github.com/GerkinDev/stack-subject/blob/cc65284/src/StackSubject.ts#L51)*

Emit the current value.

**Returns:** `void`

___
<a id="next"></a>

###  next

▸ **next**(value?: *[T]()*): `void`

*Overrides Subject.next*

*Defined in [StackSubject.ts:24](https://github.com/GerkinDev/stack-subject/blob/cc65284/src/StackSubject.ts#L24)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` value | [T]() |

**Returns:** `void`

___
<a id="pop"></a>

###  pop

▸ **pop**(count?: *`number`*): `this`

*Defined in [StackSubject.ts:85](https://github.com/GerkinDev/stack-subject/blob/cc65284/src/StackSubject.ts#L85)*

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

*Defined in [StackSubject.ts:98](https://github.com/GerkinDev/stack-subject/blob/cc65284/src/StackSubject.ts#L98)*

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

*Defined in [StackSubject.ts:60](https://github.com/GerkinDev/stack-subject/blob/cc65284/src/StackSubject.ts#L60)*

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

*Defined in [StackSubject.ts:73](https://github.com/GerkinDev/stack-subject/blob/cc65284/src/StackSubject.ts#L73)*

Append items to the stack, and emit each one of them

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Rest` items | `T`[] |  Items to add at the end of the stack. |

**Returns:** `this`

___

