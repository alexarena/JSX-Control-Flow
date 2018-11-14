This very contrived demo is primarily intented as a POC, but could easily be adapted for production.
While it implements For loops and complete If/ElseIf/Else control flow, it does so *entirely* in standard JSX.
No need for additional Babel configuration like: https://github.com/AlexGilleran/jsx-control-statements
Thus, while the syntax is similar, it is somewhat novel.

### Control-Flow (If/ElseIf/Else)

These are quite cool. You can use <If> independently as demonstrated below.
The syntax is intuitive and aesthetically pleasing (imo).  

```js
<If condition={x % 2 === 0}>
  <p>x is an even number</p>
</If>
```

While you've seen an <If> component done a million times before, here's something cool - complete If/ElseIf/Else control flow:

```js
<Conditional>
  <If condition={x > 0}>
    positive
  </If>
  <ElseIf condition={x < 0}>
    negative
  </ElseIf>
  <Else>
    neither positive nor negative
  </Else>
</Conditional>
```

Complete control flow in 100% valid JSX 😎

### Loops

Loop syntax isn't ideal, but is still interesting.

By example, say we have an array, names:
```js
const names = ['Alex','Bob','Sally']
```

We can render a list item component for each item in the array using the For component. This component requires one child, it can be in either of the forms below:
```js
<ul>
  <For each="name" of={names}>
    <Name />
  </For>
</ul>
```

where <Name /> is a component defined thusly:
```js
  const Name = ({name}) =>(
    <li>Name: {name}</li>
  )
```
Or:
```js
<ul>
  <For each="name" of={names}>
    {({name})=>(
      <li>Name: {name}</li>
    )}
  </For>
</ul>
```
