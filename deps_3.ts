import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import { readFileSync } from 'fs'
import { resolve, relative, dirname } from 'path'

// 运行代码：node -r ts-node/register --inspect-brk let_to_var.ts
const projectRoot = resolve(__dirname, 'project_3') // /Users/roger/project/Webpack_Deps/project_1/project_1

// 定义依赖关系模型
type DepRelation = {
    [key: string]: {
        deps: string[],
        code: string
    }
}

// 初始化一个空的depRelation，用于搜集依赖
const depRelation: DepRelation = {}

colleCodeAndDeps(resolve(projectRoot,'index.js'))

console.log(depRelation)

function colleCodeAndDeps(filepath: string) {
    const key = getProjectPath(filepath) // index.js
    
    const code = readFileSync(filepath).toString() // 读取index.js文件内容

    // 初始化depRelation
    depRelation[key] = {deps: [], code: code}

    // 代码转换为ast
    const ast = parse(code, {sourceType: 'module'})

    traverse(ast, {
        enter: path => {
            if(path.node.type === 'ImportDeclaration') {
                // 转成绝对路径
                const depAbsolutePath = resolve(dirname(filepath), path.node.source.value) // path.node.source.value等于./b.js是相对路径
                
                // 转化成相对于根路径目录
                const depProjectPath = getProjectPath(depAbsolutePath)

                depRelation[key].deps.push(depProjectPath)
                colleCodeAndDeps(depAbsolutePath)
            }
        }
    })
}

function getProjectPath(path: string) {
    return relative(projectRoot, path)
}

