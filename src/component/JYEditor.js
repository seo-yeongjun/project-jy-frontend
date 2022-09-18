import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import {useRef} from "react";

export default function ToastEditor({setContent}) {
    const editorRef = useRef();

    const handleEditorChange = () => {
        const data = editorRef.current.getInstance().getHTML();
        setContent(data)
    }

    return (<div className="text-start">
        <Editor
            previewStyle="vertical"
            height="30vh"
            placeholder={"판매 할 책에 대한 설명, 원하는 거래 장소, 시간 등\n 자유롭게 작성해 주세요."}
            initialEditType="wysiwyg"
            useCommandShortcut={false}
            hideModeSwitch={true}
            plugins={[colorSyntax]}
            language="ko-KR"
            ref={editorRef}
            onChange={handleEditorChange}
            toolbarItems={[['heading', 'bold', 'italic'], ['strike', 'hr', 'quote',],['link']]}/>
    </div>);
}
