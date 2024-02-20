---
layout: page.11ty.cjs
title: <installments-component> ⌲ Home
---

# &lt;installments-component>

`<installments-component>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<installments-component>` is just an HTML element. You can it anywhere you can use HTML!

```html
<installments-component></installments-component>
```

  </div>
  <div>

<installments-component></installments-component>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<installments-component>` can be configured with attributed in plain HTML.

```html
<installments-component name="HTML"></installments-component>
```

  </div>
  <div>

<installments-component name="HTML"></installments-component>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<installments-component>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name = 'lit-html';

render(
  html`
    <h2>This is a &lt;installments-component&gt;</h2>
    <installments-component .name=${name}></installments-component>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;installments-component&gt;</h2>
<installments-component name="lit-html"></installments-component>

  </div>
</section>
