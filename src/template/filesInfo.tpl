<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <title>{{title}}</title>
  </head>
  <body>
        {{#each files}}
            <a href="{{dir}}/{{this}}">{{this}}</a>
        {{/each}}
  </body>
</html>
