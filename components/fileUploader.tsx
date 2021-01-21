import React, {ChangeEvent, FormEvent, Fragment, useState} from "react"
// API
import {FileUpload} from "../api/fileUpload"

const FileUploadComp = () => {
    const [file, setFile] = useState<any>()
    const [filename, setFilename] = useState("Choose File")
    const [uploadedFile, setUploadedState] = useState({})

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target || !e.target.files || e.target.files.length < 1) return
        else {
            setFile(e.target.files[0])
            setFilename(e.target.files[0].name)
            console.log(filename)
        }
    }
    const onFileSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("Submission queued")
        const formData = new FormData()
        formData.append("file", file, filename)
        try {
            FileUpload(formData).then((ques) => {
                console.log("Yay!!!")
            })
        } catch (err) {

        }
    }

    return (
        <Fragment>
            <form onSubmit={onFileSubmit}>
                <div className="form-group">
                    <label htmlFor="customFile">{filename}</label>
                    <input type="file" className="form-control-file" id="customFile" onChange={onFileChange}/>
                </div>
                <input type={"submit"} value={"Upload"}></input>
            </form>
        </Fragment>
    )
}

export default FileUploadComp