import React from 'react'
import content from './welcome.md'

export default function Content() {
    return (
        <div className="home-wrap">
            <Markdown source={content} />
        </div>
    )
}
