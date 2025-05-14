"use client"
import { useSignUp } from "@clerk/nextjs"
import {set, z} from "zod"
import { signUpSchema } from "@/schema/signUpScheme" 
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { is } from "drizzle-orm"


export default function SignUp(){
    const [isVerifying, setIsVerifying] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [authError, setAuthError] = useState<string | null>(null)

    const  {signUp, isLoaded, setActive} = useSignUp()

    const onSubmit = async(data: z.infer <typeof signUpSchema>) =>{
        if(!isLoaded) return
       setIsSubmitting(false)
       setAuthError(null)

       try{
         await signUp.create({
            emailAddress: data.email,
            password: data.password,
         })

         await signUp.prepareEmailAddressVerification({
            strategy: "email_code"
         })
       setIsVerifying(true)
       } catch(error: any){
        console.log("Signup error", error.message)
        setAuthError(error.message)
       } finally{
        setIsSubmitting(false)
       }
    }
    const handleVerification = async() =>{}

    const {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    return <h1>This is a signup form</h1>
}