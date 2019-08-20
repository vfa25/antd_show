import React from 'react'
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown'
import CodeClock from './CodeClock'

export function render(props: ReactMarkdownProps) {
    const { source, renderers, ...rest } = props
    return (
        <ReactMarkdown
            {...rest}
            source={source}
            renderers={{
                ...renderers,
                code: CodeClock
            }}
        />
    )
}
