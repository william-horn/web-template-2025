
# **merge-classes-v2**

## `mergeClasses()`

Merges `importedClass` into a copy of `baseClass` and returns that copy. Used for packaging **tailwind classes** together for components containing multiple elements that need to be individually reached for custom styling.

* **Arguments:**
  - `baseClass<Object>` - The original class object
  - `importedClass<Object>` - The new class object that will overwrite `baseClass` object fields
  - *(optional)* `customSpecialKeys<Object>` - An optional object of special keys that map to a callback function which is called during the class merging.
      - **default:** `{}`

`importedClass` and `baseClass` are nested objects with the following structure:

```js
{
  self: "tw-class class-2 class-3",
  prop: {
    self: "class-a class-b"
  }
}
```


### **$specialKey**

`mergeClasses()` will scan objects for fields that begin with `$` - these are **reserved** field names that will trigger a callback function passing the current `directory` of the output class object, the `$keyName` of the field, the value of this field in the `baseClass` if it exists, and the value of this key in the `importedClass`.

### Ex:

```js
const stateObj = [
  ["selected", { self: "class-c" }]
]

const classOne = {
  self: "class-1",
}

const classTwo = {
  self: "class-2"

  // special field
  $state: stateObj
}

mergeClasses(classOne, classTwo)
```

Internally, `mergeClasses()` will call this callback function when it reaches the `$state` field:

```js
customSpecialKeys.state(
  classTwo,
  "$state",
  undefined,
  stateObj
)
```

Custom special keys can be passed to `mergeClasses()` as an optional third argument defined as `customSpecialKeys`. This argument is set to `{}` by default.

### **Ex:**

```js
const classOne = {
  self: "class-1",
}

const classTwo = {
  self: "class-2"

  // special field
  $customKey: "Hello, world"
}

const outputClass = mergeClasses(
  classOne, 
  classTwo,
  {
    customKey: (directory, key, baseValue, importedValue) => {
      // baseValue: undefined
      // importedValue: "Hello, world"
      directory[key] = "custom value"
    }
  }
)
```

The resulting `outputClass` object will look like this:

```js
{
  self: "class-2",
  $customKey: "custom value"
}
```

### **$state**

The built-in special key `$state` will merge lists of state class objects together. A state class object is a class which only merges with the final output class when a certain state is active. 

### Ex:

```js
const classOne = {
  self: "bg-white",
}

const classTwo = {
  self: "bg-black",

  $state: [
    ["selected", { self: "bg-red" }]
  ]
}

// call compileClass() to pass the state object
const outputClass = compileClass({
  className: mergeClasses(classOne, classTwo),
  state: {
    selected: true
  }
})
```

The resulting output class will look like this:

```js
{
  self: "bg-red",
  $state: [
    ["selected", { self: "bg-red" }]
  ]
}
```

Because the state `{ selected: true }` was passed to `compileClass()`, which merged the state's class to the final output class.

Also works when both `baseClass` and `importedClass` are tailwind class strings:

```js
mergeClasses("tw-1", "tw-2") // -> { self: "tw-2" }
```

or 

```js
mergeClasses("tw-1", { self: "tw-2" }) // -> { self: "tw-2" }
```

or 

```js
mergeClasses({ self: "tw-1" }, "tw-2") // -> { self: "tw-2" }
```