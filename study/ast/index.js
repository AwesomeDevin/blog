const acorn =  require('acorn')
const fs = require('fs')
const escodegen = require('escodegen')
var jsx = require("acorn-jsx");
var JSXParser = acorn.Parser.extend(jsx());
const generate = require('@babel/generator').default
const esprima = require('esprima')
const sourceCode = fs.readFileSync('./source.js','utf-8')
const parser = require('@babel/parser')

const ast = parser.parse(sourceCode,{
  sourceType: 'module',
  plugins:[
    'jsx'
  ]
}).program

function removeConsole(consoler){
  if(consoler.object&&consoler.object.name === 'console')
  {
    return true
  }
}


function workNode(ast){
  let { body } = ast
  let argumentArr = ast.arguments
  if(body && body instanceof Array)
  {
    for( let itemIndex = 0;itemIndex< body.length; itemIndex++)
    {
      const item = body[itemIndex]
      if(item.body)
      {
        workNode(item)
      }
      else if(item.expression && item.expression.type === 'CallExpression' ){
        const expression = item.expression
        if(removeConsole(expression.callee) && body.splice(itemIndex,1))
        {
          itemIndex = itemIndex - 1
        }
        if(expression.arguments && expression.arguments instanceof Array){
          workNode(expression)
        }
      }
      else if(item.type === 'ReturnStatement'){
        workNode(item.argument)
      }
    }
  }
  else if(body){
    workNode(body)
  }
  if( argumentArr && argumentArr instanceof Array )
  {
    for(const argument of argumentArr)
    {
      if(argument.body)
      {
        workNode(argument)
      }
    }
  }

}


function main(ast){
  workNode(ast)
  // fs.writeFileSync('./target.js', JSON.stringify(ast)  )
  return generate(ast).code
}

// main(ast)
fs.writeFileSync('./target.js', main(ast) )
// workNode(ast)

