import { useEffect, useState } from "react";
import AuthLayout from "../components/AuthLayout";
import FormControl from "../components/FormControl";
import Footer from "../components/global/Layout/Footer";
import Button from "../components/common/Button";
import ApiClient from "../methods/api/apiClient";

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)

    const submit = () => {
        if (step == 1) {
            setStep(2)
        } else {
            setLoading(true)
            
            console.log("form", form)
        }
    }
    return <>
        <AuthLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <div className="max-w-[287px]">
                        <div className="text-[16px]">STEP {step}</div>
                        <h3 className="md:text-[30px] text-[23px] font-medium mb-[12px]">
                            {step == 1 ? <>
                                Enter your email address to continue
                            </> : <>
                                Create an account to continue
                            </>}
                        </h3>
                        <p className="text-[14px]">{step == 1 ? <>
                            Log in to your account. If you don’t have one, you will be prompted to create one.
                        </> : <>
                            You’ll be able to log in to Dingoo with this email address and password.
                        </>}</p>
                    </div>

                </div>
                <div>
                    <form onSubmit={e => { e.preventDefault(); submit() }}>
                        {step == 1 ? <>
                            <FormControl
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                required
                                onChange={e => setForm({ ...form, email: e })}
                            />

                            <div className="mt-[20px] text-right">
                                <Button type="submit">
                                    Continue
                                </Button>
                            </div>
                        </> : <>
                        <p className="text-[16px] mb-[12px]">Enter a password to create your account with </p>
                            <FormControl
                                type="password"
                                placeholder="Choose a password"
                                value={form.password}
                                minLength={9}
                                required
                                onChange={e => setForm({ ...form, password: e })}
                            />

                            <div className="mt-[20px] md:flex gap-3 items-start">
                                <p className="text-[14px] md:mb-[0px] mb-[17px]">Use a minimum of 6 characters (case sensitive) with at least one number or special character.</p>
                                <Button type="submit" className="min-w-[235px]" loading={loading}>
                                    Agree & Continue
                                </Button>
                            </div>

                        </>}


                    </form>
                </div>
            </div>

            {step == 2 ? <>
                <div className="mt-[30px] text-[12px]">
                    Dingoo will use your data to personalise and improve your Dingoo experience and to send you information about Dingoo. You can change your communication preferences anytime. We may use your data as described in our Privacy Policy, including sharing it with The Test of Companies. By clicking "Agree & Continue", you agree to our Subscriber Agreement and acknowledge that you have read our Privacy Policy and Collection Statement.
                </div>
            </> : <></>}
        </AuthLayout>
        <Footer />
    </>
}