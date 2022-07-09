// import { parser } from '@babel/parser'
import traverse from '@babel/traverse'
import { resolve } from 'path'

// 运行代码：node -r ts-node/register --inspect-brk let_to_var.ts
const projectRoot = resolve(__dirname, 'project_1') // /Users/roger/project/Webpack_Deps/project_1/project_1

// 定义依赖关系模型
type DepRelation = {
    [key: string]: {
        deps: string[],
        code: string
    }
}

// 初始化一个空的depRelation，用于搜集依赖
const depRelation: DepRelation = {}

colleCodeAndDeps()

function colleCodeAndDeps() {
    
}


