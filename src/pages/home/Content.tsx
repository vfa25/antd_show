import React from 'react'
import content from './content.md'

export default function Content() {
    return (
        <div className="home-wrap">
            <Markdown.render source={content} />
        </div>
    )
}
