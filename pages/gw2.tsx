import Layout from '../components/Layout'
import TableExample from "../components/ReactTableExample"
import { Button, Form, FormGroup } from "react-bootstrap"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as lsUtil from "../utility/localStorageUtil"

function makeAxiosObject(token?: string) {
    let obj = axios.create({
        baseURL: "http://159.65.149.50:4000/v1",
        headers: {
            'Access-Control-Allow-Origin': 'true'
        }
    })

    if (token) obj.defaults.headers.post['Authorization'] = token

    return obj
}


type ITextInputFragmentProps = {
    label: string
    placeholder: string
    callback: (value: React.SetStateAction<string>) => void
    type?: string
}

function InputTextFieldFragment(props: ITextInputFragmentProps) {
    const { label, placeholder, callback, type } = props
    return (
        <React.Fragment>
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type ? type : "email"} placeholder={placeholder} onChange={(e) => { callback(e.target.value) }}></Form.Control>
        </React.Fragment>
    )
}

export default function DroprateResearch() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const submitForm = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()

        makeAxiosObject().post("/user/login", {
            "name": "",
            "email": email,
            "password": password
        }).then((res) => {
            if (res.status == 200) {
                console.log(res.data)
                lsUtil.writeTokenStorage({ isValid: true, token: res.data.token, expiry: "" })
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const getGW2Info = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        let token = lsUtil.readTokenStorage()
        if (token) {
            makeAxiosObject().get("/gw2", {
            }).then((res) => {
                console.log(res);

            }).catch((err) => {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        // console.log(username)
    }, [])

    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <Form>
                <Form.Group controlId="basic">
                    <InputTextFieldFragment label={"Email address"} placeholder="Enter Email" callback={setEmail} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <InputTextFieldFragment label={"Password"} type="password" placeholder="Password" callback={setPassword} />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="button" onClick={(e) => submitForm(e)}>
                    Submit
                </Button>
            </Form>

            <Form>
                <Button variant="primary" type="button" onClick={(e) => getGW2Info(e)}>
                    Get Guild Wars 2 Information
                </Button>
            </Form>
        </Layout>
    )
}