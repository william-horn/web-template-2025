
# **merge-classes-v2**

## `mergeClasses(baseClass, importedClass, customSpecialKeys)`

Merges `importedClass` into a copy of `baseClass` and returns that copy. Both classes are nested objects with the following structure:

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

### **Ex:**

```js
{
  self: "tw-class class-2 class-3",
  prop: {
    self: "class-a class-b"
  },

  // special field
  $state: [
    ["selected", { self: "class-c" }]
  ]
}
```