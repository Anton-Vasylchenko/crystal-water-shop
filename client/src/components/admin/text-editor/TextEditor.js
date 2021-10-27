import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './TextEditor.css';

function TextEditor({ content, onChangeInfo, fieldName }) {
    const [text, setText] = useState(content);

    const onSaveShanges = (event, editor) => {
        const data = editor.getData()
        setText(data);
        onChangeInfo(fieldName, text);
    }

    return (
        <div className="App">
            <div className="editor">
                <CKEditor
                    editor={ClassicEditor}
                    data={text}
                    config={
                        {
                            fontFamily: {
                                options: [
                                    "default",
                                    "Ubuntu, Arial, sans-serif",
                                    "Ubuntu Mono, Courier New, Courier, monospace",
                                ],
                            },
                            fontSize: {
                                options: [9, 11, 13, "default", 17, 19, 21],
                            },
                            toolbar: ['heading', '|', 'bold', 'italic', 'numberedList', 'bulletedList', 'insertTable',
                                'tableColumn', 'tableRow', 'mergeTableCells', '|', 'undo', 'redo', 'fontSize', 'fontFamily'],
                            placeholder: 'Enter the product description'
                        }
                    }
                    onChange={(event, editor) => {
                        onSaveShanges(event, editor);
                    }}
                    onBlur={(event, editor) => {
                        onSaveShanges(event, editor);
                    }}
                />
            </div>
        </div>
    );
}

export default TextEditor;
