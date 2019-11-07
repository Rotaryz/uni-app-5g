---
to: "src/pages.json"
inject: true
after: "subPackages"
---
    {
      "root": "package-<%= packageName%>/",
      "pages": [
        "<%= packageName%>_todo,"
      ]
    },
