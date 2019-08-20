import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { railscasts } from 'react-syntax-highlighter/dist/styles/hljs'

interface CodeBlockPropsType {
    language: string
    value: string
}
export default function CodeBlock(props: CodeBlockPropsType) {
    let { value, language = 'javascript' } = props
    return (
        <SyntaxHighlighter language={language} style={railscasts}>
            {value}
        </SyntaxHighlighter>
    )
}
