---
to: "src/pages.json"
inject: true
before: <%= package[0]==='main'?package[1]:package[2] %>

---
<%_ if (package[0]==='main') { _%>
    "pages/<%= name _%>",<%_ } else { _%>
        "<%= name _%>",<%_ } _%>
