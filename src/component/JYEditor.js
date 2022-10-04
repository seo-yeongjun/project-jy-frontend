import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import {useEffect, useRef} from "react";
import axios from "../api/axios";

export default function ToastEditor({setContent,memberId}) {
    const editorRef = useRef();

    const handleEditorChange = () => {
        const data = editorRef.current.getInstance().getHTML();
        setContent(data)
    }

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.getInstance().removeHook("addImageBlobHook");
            editorRef.current
                .getInstance()
                .addHook("addImageBlobHook", (blob, callback) => {
                    if(blob.size > 1024 * 1024 * 10){
                        alert("10MB 이하의 이미지만 업로드 가능합니다.")
                        return;
                    }
                    (async () => {
                        let formData = new FormData();
                        formData.append("file", blob);

                        await axios.post(
                            `sale/book/photo?memberId=${memberId}`,
                            formData,
                            {
                                headers: {"content-type": "multipart/form-data"},
                            }
                        ).then((res) => {
                            callback(res.data, "alt text");
                        });

                    })();

                    return false;
                });
        }

        return () => {
        };
    }, [editorRef])


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
            toolbarItems={[['heading', 'bold', 'italic'], ['strike', 'hr', 'quote',], ['link', 'image']]}/>
    </div>);
}
