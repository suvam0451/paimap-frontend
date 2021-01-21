import axios from "axios"

const API_URL = "http://localhost:4000"
// const API_URL = ""
export const FileUpload = async (data: FormData) => {
    console.log("Trying upload")
    try {
        console.log("Trying upload")
        const res = await axios.post(API_URL + "/api/upload", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        const {filename, filePath} = res.data
    } catch (e) {
        if (e.response.status === 500) {
            console.log("There was a problem with the server")
        }
        console.log("Error: ", e)
    }
}