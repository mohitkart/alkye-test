import { useEffect, useState } from "react";
import AuthLayout from "../components/AuthLayout";
import FormControl from "../components/FormControl";
import Footer from "../components/global/Layout/Footer";
import Button from "../components/common/Button";

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' })
    return <>
        <AuthLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <div className="max-w-[287px]">
                        <div className="text-[16px]">STEP 1</div>
                        <h3 className="text-[26px] font-medium mb-[12px]">Enter your email address to continue</h3>
                        <p className="text-[16px]">Log in to your account. If you don’t have one, you will be prompted to create one.</p>
                    </div>

                </div>
                <div>
                    <FormControl
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e })}
                    />
                    <div className="mt-[15px] text-right">
                        <Button>Continue</Button>
                    </div>
                </div>
            </div>

        </AuthLayout>
        <Footer />
    </>
}