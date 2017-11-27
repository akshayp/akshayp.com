---
title: "Webkit Scrollbar CSS"
link: "/webkit-scrollbar-css/"
category: "Technology"
id: "1483"
date: "2010-12-28 11:31:44"
---

If you find yourself developing a Chrome App or want to enhance an experience from the default browser behavior, webkit
lets you define a skin to override the OS stylesheet. You can use any css attribute to style the scrollbars including
CSS3 gradients

```css
::-webkit-scrollbar {
    background: #303030;
    border: 1px solid #292929;
    height: 8px;
    width: 8px;
}
```

<cite>[Via : Webkit Blog](https://webkit.org/blog/363/styling-scrollbars/)</cite>
