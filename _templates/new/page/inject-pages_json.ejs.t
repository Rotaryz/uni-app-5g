---
to: "src/pages.json"
inject: true
after: <%= package[0]==='main'?'subPackages':package[1]  %>

---
<%_ if (package[0]==='main') { _%>
    '',<%_} else { _%>
        "<%= name _%>/<%= name _%>",<%_ } _%>
