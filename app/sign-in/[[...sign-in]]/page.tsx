import Navbar from "@/components/Navbar";
import SignInForm from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <div>
        <Navbar/>
      <div className="flex-1 flex justify-center items-center py-5">
        <SignInForm />
      </div>
    </div>
  );
}